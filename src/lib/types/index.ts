export interface Tenant {
  id: string;
  name: string;
  address: string;
  updatedAt: string;
}
export interface Attribute {
  name: string;
  widgetType: "switch" | "radio";
  defaultValue: string;
  availableOptions: string[];
}
export interface PriceConfiguration {
  [key: string]: {
    price: "base" | "additional";
    availableOptions: string[];
  };
}
export interface Category {
  _id: string;
  name: string;
  priceConfiguration: PriceConfiguration;
  attributes: Attribute[];
}

export type ProductAttribute = {
  name: string;
  value: string | boolean;
};

export interface ProductPriceConfiguration {
  [key: string]: {
    priceType: "base" | "additional";
    availableOptions: {
      [key: string]: number;
    };
  };
}

export type Product = {
  _id: string;
  name: string;
  image: string;
  description: string;
  category: Category;
  priceConfiguration: ProductPriceConfiguration;
  attributes: ProductAttribute[];
  isPublish: boolean;
  createdAt: string;
};

export type Topping = {
  id: string;
  name: string;
  image: string;
  price: number;
  isAvailable: boolean;
};
