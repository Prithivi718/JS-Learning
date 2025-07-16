// IIFE's --> are Immediately Invoked Function Expression, which is Immediately invoked after it's created!
// IIFE's are defined inside a '()'

const now= new Date();

(
    function (){
        
        let hrs= now.getHours().toString().padStart(2, 0);
        hrs=  hrs%12 || 12;
        let mins= now.getMinutes().toString().padStart(2, 0);
        let secs= now.getSeconds().toString().padStart(2, 0);
        console.log(`Hey this is Normal Funciton Expression invoked at minutes: ${hrs}:${mins}:${secs}`)
    }
)();

(
    () => {
        
        let hrs= now.getHours().toString().padStart(2, 0);
        hrs=  hrs%12 || 12;
        let mins= now.getMinutes().toString().padStart(2, 0);
        let secs= now.getSeconds().toString().padStart(2, 0);
        console.log(`Hey this is Arrow Function invoked at minutes: ${hrs}:${mins}:${secs}`)
    }
)();


// Step 1: Define callback functions
function greetUser(time) {
    console.log(`👋 Greet: Hello! Current time is ${time}`);
}

function timeLengthLogger(time) {
    console.log(`📏 Time Length: ${time.length} characters`);
}


(
    async (greetCallback, lengthCallback)=> {

         // Simulate async task
        await new Promise(resolve => setTimeout(resolve, 4000));
        
        let hrs= now.getHours().toString().padStart(2, 0);
        hrs=  hrs%12 || 12;
        let mins= now.getMinutes().toString().padStart(2, 0);
        let secs= now.getSeconds().toString().padStart(2, 0);
        timeStr= `${hrs}:${mins}:${secs}`
        console.log(`Hey this is Async Arrow function invoked at minutes: ${timeStr}`)
        
        greetCallback(timeStr);
        lengthCallback(timeStr);
    }

)(greetUser, timeLengthLogger);