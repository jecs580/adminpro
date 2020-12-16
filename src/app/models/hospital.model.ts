interface _HospitalUser{
    name:string;
    _id:string;
    img:string;
}
export class Hospital{
    constructor(
        public name: string,
        public _id?: string,
        public img?: string,
        public usuario?: _HospitalUser,
    ){}
}