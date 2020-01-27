import {TimelineMax} from 'gsap'
import * as $ from 'jquery'

let tl = new TimelineMax();
tl
    .fromTo('.header', 1.5, {y:-200,opacity: 0}, {y: 0, opacity: 1})

class Post {
    static async getAll(){
        return new Promise( (resolve, reject) => {
            if(true){
                resolve(1);
            }
        });
    }
}
Post.getAll();
console.log("TCL: Post.getAll();", Post.getAll().then(data => data).then(data1 => {
    document.write(data1)
}))