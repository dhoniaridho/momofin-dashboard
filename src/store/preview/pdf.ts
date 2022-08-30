import formatJsonStage from '~/helpers/formatJsonStage'
import { defineStore } from 'pinia'

interface State {
  coordinates: any[]
  rawCoordinates: any[]
  originalDocument: string
  pageLength: number
  currentPage: number
  stageElement: any
  document: {
    width: number
    height: number
  }
  scale: number
  mySpeciment: string
}
const usePdfStorePreview = defineStore('usePdfPreviewStore', {
  state: (): State => ({
    coordinates: [],
    rawCoordinates: [],
    originalDocument: '',
    pageLength: 1,
    currentPage: 1,
    stageElement: null,
    document: {
      width: 0,
      height: 0,
    },
    mySpeciment: '',
    scale: window.innerWidth / window.innerHeight,
  }),
  actions: {
    removeById(id: string) {
      this.rawCoordinates = this.rawCoordinates.filter(
        (coordinate: any) => coordinate?.uid !== id
      )
    },
    addData(payload: any) {
      return (this.$state.rawCoordinates = [
        ...this.$state.rawCoordinates,
        payload,
      ])
    },
    setPageLength(payload: number) {
      this.$state.pageLength = payload
      for (let i = 0; i < payload - 1; i++) {
        if (this.$state.coordinates.length > payload) return
        this.$state.coordinates.push([])
      }
    },
    setCurrentPage(payload: number) {
      if (payload <= 0 || payload > this.$state.pageLength)
        return this.$state.currentPage
      const lastPage = this.$state.currentPage
      const stage: any = this.$state.stageElement.getStage()
      const annotations: any = stage.find((node: any) => {
        return node.attrs.type == 'annotation'
      })
      this.$state.coordinates[lastPage - 1] = formatJsonStage(annotations)
      const nextPageCoordinate = this.$state.coordinates[payload - 1]
      this.$state.rawCoordinates = nextPageCoordinate
      return (this.$state.currentPage = payload)
    },
    nextPage() {
      if (this.$state.currentPage >= this.$state.pageLength) return
      this.$state.currentPage = this.$state.currentPage + 1
      this.$state.rawCoordinates =
        this.$state.coordinates[this.$state.currentPage - 1]
    },
    setPage(page: number) {
      page = parseInt('' + page)
      if (page < 1 || page > this.$state.pageLength)
        return this.$state.currentPage
      this.$state.currentPage = page
      this.$state.rawCoordinates = this.$state.coordinates[page - 1]
      return page
    },
    setDocumentSize(payload: any) {
      this.$state.document.height = payload.height
      this.$state.document.width = payload.width
    },
    setStageElement(payload: any) {
      return (this.$state.stageElement = payload)
    },
    previousPage() {
      if (this.$state.currentPage <= 1) return
      this.$state.currentPage = this.$state.currentPage - 1
      this.$state.rawCoordinates =
        this.$state.coordinates[this.$state.currentPage - 1]
    },
    setCoordinate(payload: any) {
      this.$state.coordinates = payload
      this.$state.rawCoordinates = payload[this.$state.currentPage - 1]
    },
    setMySpeciment(payload: string) {
      this.$state.mySpeciment = payload
    },
    setScale(payload: number) {
      this.$state.scale = payload
    },
  },
  getters: {
    getRawCoordinate(state) {
      return state.rawCoordinates
    },
    getOriginalDocumentURL(state) {
      return state.originalDocument
    },
    getCoordinate(state) {
      return state.coordinates
    },
    getMySpeciment(state) {
      return state.mySpeciment
    },
    getScale(state) {
      if (state.scale > 1) return 1
      else return state.scale
    },
    getCurrentPage(state) {
      return state.currentPage
    },
    getTotalPages(state) {
      return state.pageLength
    },
  },
})

export default usePdfStorePreview
