// pages/home/home.js

// 连接云数据库
const db = wx.cloud.database()
const dbVolunteers = db.collection('volunteers')
const dbServices = db.collection('services')

Page({
  data: {
    volunteers: [],
    services: [],
    selectedVolunteer: null,
    loading: true,
    loadError: false
  },

  onLoad() {
    this.loadHomeData()
  },

  onPullDownRefresh() {
    this.loadHomeData().finally(() => wx.stopPullDownRefresh())
  },

  // 从云端加载首页数据，返回 Promise
  loadHomeData() {
    const that = this
    this.setData({ loading: true, loadError: false })
    wx.showLoading({ title: '加载中', mask: true })

    return Promise.all([
      dbVolunteers.get(),
      dbServices.get()
    ])
      .then(([volRes, srvRes]) => {
        that.setData({
          volunteers: volRes.data || [],
          services: srvRes.data || [],
          loading: false,
          loadError: false
        })
      })
      .catch(err => {
        console.error('加载首页数据失败', err)
        that.setData({ loading: false, loadError: true })
        wx.showToast({ icon: 'error', title: '加载失败' })
      })
      .finally(() => wx.hideLoading())
  },

  // 重试加载
  retryLoad() {
    this.loadHomeData()
  },

  openVolunteer(e) {
    this.setData({ selectedVolunteer: e.currentTarget.dataset.item })
  },

  closeVolunteer() {
    this.setData({ selectedVolunteer: null })
  },

  // 申请志愿者陪伴：支持 _id（云数据库主键）或自定义 id
  handleApply(e) {
    const docId = e.currentTarget.dataset.id
    const volunteer = this.data.selectedVolunteer
    if (!docId || (volunteer && volunteer.applied)) return

    // 1）本地乐观更新
    const volunteers = this.data.volunteers.map(v => {
      if ((v._id || v.id) === docId) v.applied = true
      return v
    })
    this.setData({
      volunteers,
      'selectedVolunteer.applied': true
    })

    // 2）云端更新：优先使用 _id（doc 方法），否则 where
    const updatePromise = docId.length === 24 && /^[a-f0-9]+$/i.test(docId)
      ? dbVolunteers.doc(docId).update({ data: { applied: true } })
      : dbVolunteers.where({ id: docId }).update({ data: { applied: true } })

    updatePromise
      .then(() => console.log('云端已标记为已申请'))
      .catch(err => {
        console.error('云端更新失败', err)
        wx.showToast({ icon: 'none', title: '网络异常，请稍后重试' })
        this.setData({
          volunteers: this.data.volunteers.map(v => {
            if ((v._id || v.id) === docId) v.applied = false
            return v
          }),
          'selectedVolunteer.applied': false
        })
      })

    wx.showToast({ title: '申请成功', icon: 'success' })
  },

  stopBubble() {}
})