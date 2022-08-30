import formatCoordinate from '~/helpers/coordinate'
import formatJsonStage from '~/helpers/formatJsonStage'
import { Signer, SignerPayload } from '~/interfaces'
import { defineStore } from 'pinia'
import { StepsProps } from 'naive-ui'

interface RawCoordinate {
  documentHeight: number
  documentWidth: number
  emet: boolean
  height: number
  product: 'peruri-sign' | 'emet'
  category: '1' | '2'
  uid: string
  user: Signer
  width: number
  x: number
  y: number
}

interface State {
  signers: SignerPayload[]
  coordinates: any[]
  rawCoordinates: RawCoordinate[]
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
  allPlacement: any[]
  documentId: string
  file: File | null
  tabs: {
    current: number
    currentStatus: StepsProps['status']
  }
  documentName: string
}

const usePdfStore = defineStore('usePdfStore', {
  state: (): State => ({
    signers: [],
    coordinates: [],
    rawCoordinates: [],
    allPlacement: [],
    originalDocument: '',
    documentName: '',
    pageLength: 1,
    currentPage: 1,
    stageElement: null,
    document: {
      width: 0,
      height: 0,
    },
    scale: window.innerWidth / window.innerHeight,
    documentId: '',
    mySpeciment: '',
    file: null,
    tabs: {
      current: 1,
      currentStatus: 'process',
    },
  }),
  actions: {
    removeById(id: string) {
      const index = this.allPlacement.findIndex((v: any) => v.uid == id)
      this.allPlacement.splice(index, 1)
      this.rawCoordinates = this.rawCoordinates.filter(
        (coordinate: any) => coordinate?.uid !== id
      )
    },
    addData(payload: any) {
      this.allPlacement.push(payload)
      if (!Array.isArray(this.rawCoordinates)) {
        this.rawCoordinates = []
      }
      this.$state.rawCoordinates.push(payload)
    },
    setPageLength(payload: number) {
      for (let i = 0; i < payload - 1; i++) {
        if (this.$state.coordinates?.length > payload) return
        this.$state.coordinates.push([])
      }
      return (this.$state.pageLength = payload)
    },
    setCurrentPage(payload: number) {
      if (payload <= 0 || payload > this.$state.pageLength)
        return this.$state.currentPage
      const lastPage = this.$state.currentPage
      const stage = this.$state.stageElement.getStage()
      const annotations = stage.find((node: any) => {
        return node.attrs.type == 'annotation'
      })
      this.$state.coordinates[lastPage - 1] = formatJsonStage(annotations)
      const nextPageCoordinate = this.$state.coordinates[payload - 1]
      this.$state.rawCoordinates = nextPageCoordinate
      return (this.$state.currentPage = payload)
    },
    nextPage() {
      if (this.$state.currentPage >= this.$state.pageLength) return
      const stage = this.$state.stageElement.getStage()
      const annotations = stage.find((node: any) => {
        return node.attrs.type == 'annotation'
      })
      this.$state.coordinates[this.$state.currentPage - 1] =
        formatJsonStage(annotations)
      this.$state.currentPage += 1
      this.$state.rawCoordinates =
        this.$state.coordinates[this.$state.currentPage - 1]
    },
    previousPage() {
      if (this.$state.currentPage <= 1) return
      const stage = this.$state.stageElement.getStage()
      const annotations = stage.find((node: any) => {
        return node.attrs.type == 'annotation'
      })
      this.$state.coordinates[this.$state.currentPage - 1] =
        formatJsonStage(annotations)
      this.$state.currentPage -= 1
      const coordinatePage =
        this.$state.coordinates[this.$state.currentPage - 1]
      this.$state.rawCoordinates = coordinatePage
    },
    setStageElement(payload: any) {
      return (this.$state.stageElement = payload)
    },
    setDocumentSize(payload: any) {
      this.$state.document.height = payload.height
      this.$state.document.width = payload.width
    },
    compileCoordinate(): SignerPayload[] {
      const stage = this.$state.stageElement?.getStage()
      const annotations = stage.find((node: any) => {
        return node.attrs.type == 'annotation'
      })
      this.$state.coordinates[this.$state.currentPage - 1] =
        formatJsonStage(annotations)
      const signers = formatCoordinate(this.$state.coordinates)
      this.$state.signers = signers
      return signers
    },
    setCoordinate(payload: any) {
      this.$state.coordinates = payload
      this.$state.rawCoordinates = payload[this.$state.currentPage - 1]
    },
    setScale(payload: number) {
      this.$state.scale = payload
    },
    setMySpeciment(payload: string) {
      this.$state.mySpeciment = payload
    },
    setDocumentId(payload: string) {
      this.$state.documentId = payload
    },
    setSigners(payload: any) {
      this.$state.signers = payload
    },
    resetCoordinates() {
      this.$state.coordinates = []
      this.$state.rawCoordinates = []
    },
    resetState() {
      this.resetCoordinates()
      this.tabs.current = 1
      this.tabs.currentStatus = 'process'
      this.documentId = ''
      this.file = null
      this.originalDocument = ''
      this.signers = []
      this.allPlacement = []
      this.rawCoordinates = []
      this.document = {
        height: 0,
        width: 0,
      }
    },
    nextFlow(flow?: number) {
      if (flow) {
        this.$state.tabs.current = flow
        this.$state.tabs.currentStatus = 'process'
        return
      }
      this.$state.tabs.current = this.$state.tabs.current + 1
      this.$state.tabs.currentStatus = 'process'
    },
    prevFlow() {
      this.$state.tabs.current = this.$state.tabs.current - 1
      this.$state.tabs.currentStatus = 'process'
    },
    $tabs() {
      return {
        nextFlow: this.nextFlow(),
      }
    },
  },
  getters: {
    getAllPlacement(state) {
      return state.allPlacement
    },
    getRawCoordinate(state) {
      return state.rawCoordinates
    },
    getOriginalDocumentURL(state) {
      return state.originalDocument
    },
    getCoordinate(state) {
      return state.coordinates
    },
    getScale(state) {
      if (state.scale > 1) {
        return 1
      } else {
        return state.scale
      }
    },
    getCurrentPage(state) {
      return state.currentPage
    },
    getTotalPages(state) {
      return state.pageLength
    },
    getDocumentId(state) {
      return state.documentId
    },
    getMySpeciment(state) {
      return state.mySpeciment
    },
    getProductSelected(state) {
      return state.coordinates.some((coordinate: any) => {
        return coordinate?.length > 0
      })
    },
    getTabCurrentStatus(state) {
      return state.tabs.currentStatus
    },
    getTabCurrentFlow(state) {
      return state.tabs.current
    },
  },
})

export default usePdfStore
