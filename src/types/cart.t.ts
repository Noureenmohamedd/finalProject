export interface Cart { 
    status: string
    numofcartItems: number
    cartId: string 
    data: Data
}

export interface Data {
     _id: string
     cartowner: string
     products: ProductCart[]
     createdAt: string 
    updatedAt: string
     _v: number
     totalCartPrice: number}


export interface ProductCart {
     count: number
     id: string
     product: Product2
     price: number
}

export interface Product2 {
    subcategory: Subcategory[]
    _id: string 
    title: string
    quantity: number
    imageCover: string
    category: Category
    brand: Brand 
    ratingsAverage: number
    id: string
}


export interface Subcategory {
     _id: string 
     name: string
     slug: string
     category: string
}


export interface Category {
     _id: string 
     name: string
     slug: string
     image: string
    
}

export interface Subcategory {
    _id: string 
    name: string
    slug: string
    category: string
}


export interface Category {
    _id: string 
    name: string
    slug: string
    image: string
}
export interface Brand {
     _id: string 
     name: string
     slug: string
     image: string
}