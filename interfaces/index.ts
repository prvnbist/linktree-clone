export interface ILink {
   id: string
   url: string
   title: string
   is_nsfw: boolean
   priority: number
   is_active: boolean
   created_at: string
}

export interface ILinks {
   children: React.ReactChild[] | React.ReactChildren[]
}
