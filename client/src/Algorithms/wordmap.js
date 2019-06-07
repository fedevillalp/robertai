const createWordMapData = function (wordListandNumbers,wordsSorted,number_of_words_to_plot) {
    //this function formats the most repeated words
    //in data format ready to plot
    let data = [];

    for (let i = 0; i < number_of_words_to_plot; i++) {
        if(wordsSorted[i]!=""){
        data.push({
            name: wordsSorted[i], repeated: wordListandNumbers[wordsSorted[i]]
        })
        }
    }
    
    return data;
    
}

module.exports = {

    wordMap: function (text,number_of_words_to_plot) {
        //This function received a text string and  a number and returns 
        // one object of word:times_repeated pairs for all words
        // and one vector in the order ot repetition from high to low

        let textArray = text.split(" ");
        let wordContainer = [];
        let keysSorted = null;
        
        for(let i=0; i<textArray.length;i++){
        wordContainer[textArray[i]] = (wordContainer[textArray[i]] || 0 ) + 1; //use key value pairs 
        }
        
        keysSorted = Object.keys(wordContainer).sort(function(a,b){return wordContainer[b]-wordContainer[a]});
        
        let data = createWordMapData(wordContainer,keysSorted,number_of_words_to_plot);
        return {data, keysSorted};
    }

};
