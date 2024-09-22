function createAnimationFunction(startValue, endValue, mapStartValue, mapEndValue){

    return function(x){
        if(x < startValue){
            return mapStartValue;
        } else if(x > endValue){
            return mapEndValue;
        } else {
            return (x - startValue) / (endValue - startValue) * (mapEndValue - mapStartValue) + mapStartValue;
        }
    }
}

export {createAnimationFunction};