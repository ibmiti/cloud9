function average(scores){
            // add all scores together
            var total = 0;
       
            scores.forEach(function(score){
                total += score;
            });
                 //divide by total number of scores
                 var avg = total/scores.length
            //round average  
            return Math.round(avg);
    
}

console.log("Average score for grades in enviromental science"); // adding console.log to this line allows this commentary to show up in terminal/console
var scores = [90, 98, 89, 100, 100, 86, 94];
console.log(average(scores)); //should return 94 // ading console.log in this line allows the result of average(scores) to show in console aswell

console.log("Average score for organic chem.");  
var scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];
console.log(average(scores2)); //should return 68