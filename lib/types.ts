
 export interface CardTypes{
    image: string;
    title: string;
    desc: string;
    
  }

export interface ProductList{
  id: string;
  image: string;
  purpose: string; 
  title: string; 
  discount_price: string; 
  original_price: string;
}

export interface DescTypes{
  id:number;
  image: string;
  title: string;
}

export interface Feature {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface FeatureList {
  id: number;
  image: string;
  title: string;
  description: string;
  date: string;
}

export interface HeadingList {
  title: string;
  description: string;
}