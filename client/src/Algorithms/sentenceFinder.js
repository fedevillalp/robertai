module.exports = {

    sentenceFinder: function (text, words){
        //This function receives a text string (transcript) and word array and returns 
        //an object with the word:sentence pairs found in the transctipt for all words
        let word_array = words//.trim().split(" ");
        let allSentences = text.trim().split(".");
        let foundSentences = [];
        //console.log(word_array, allSentences)
        
        for(let i=0;i<allSentences.length;i++){
            for(let j=0; j<word_array.length;j++){
                if(allSentences[i].includes(word_array[j])){
                    //console.log('Found "', word_array[j], '" in: ', allSentences[i]);
                    foundSentences.push({word: word_array[j], sentence: allSentences[i]});
                }
            }
        }


        //return ([foundSentences, allSentences.length-1]);
        return (foundSentences);
    }

}