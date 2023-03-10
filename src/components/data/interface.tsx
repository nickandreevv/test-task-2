export interface Story {
  by: string
  descendants: string
  id: number
  kids: number[]
  score: number
  time: number
  title: string
  type: string
  url: string
  comment?: Comment[]
}

export interface Comment {
  by?: string
  id?: number
  kids?: number[]
  parent?: number
  text?: string
  time?: number
  type?: string
  comment?: Comment[]
}
