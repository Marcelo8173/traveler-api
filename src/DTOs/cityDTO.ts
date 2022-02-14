export interface CreateCityDTO{
    name: string
    description: string
}

export interface ListCityDTO{
    id: string;
    name: string;
    description: string;
    created_at: Date;
    updated_at: Date;
    locations: string;
}
