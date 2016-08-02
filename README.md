# ES-Tween
Tween by es2015

## USEAGE
`  
const tween = new Tween({
             from: [0],
             to: [innerWidth - 300],
             curve: easing[func],
             during: 1000,
             onUpdate: value => {
                 this.setState({left: value[0]});
             },
             onEnd: () => {
                 isEnd = true;
                 setTimeout(() => {
                     this.setState({left: 0});
                 }, 500);
             }
    });
 
         easeRunner(tween);`
     
## TEST

npm install -g gulp

cd ES-Tween

gulp

gulp server