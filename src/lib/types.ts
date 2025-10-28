export interface Photo {
  albumId: number
  id: number
  thumbnailUrl: string
  title: string
  url: string
}

export interface Album {
  userId: number
  id: number
  title: string
}

export interface Geo {
  lat: string
  lng: string
}

export interface Address {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: Geo
}

export interface Company {
  name: string
  catchPhrase: string
  bs: string
}

export interface User {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
  address: Address
  company: Company
}