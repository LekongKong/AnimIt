# ES-Tween
Tween by es2015

## USEAGE
`          
const inQuad = t => {
    return t*t;
}

new Tween()
     .from(0)
     .to(300)
     .curve(inQuad)
     .during(1000)
     .use(tweenData => {
         console.log(tweenData);
     })
     .start();`
     
## TEST

npm install -g gulp

cd ES-Tween

gulp

gulp server