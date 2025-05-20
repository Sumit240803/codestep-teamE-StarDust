let newUser;
export default function helper(){
    if(typeof window !='undefined'){
        newUser = localStorage.getItem("firstTime");
        return newUser;
    }    
}
