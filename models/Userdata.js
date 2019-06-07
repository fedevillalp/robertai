'use strict';

module.exports = (sequelize, DataTypes) => {
  const UserData = sequelize.define('UserData', {
    user_id: DataTypes.INTEGER,
    link_to_audio: DataTypes.STRING, //link to audiofile
    audio_file_name: DataTypes.STRING,
    audio_file_duration: DataTypes.STRING,
    revai_job_id: DataTypes.STRING,
    audio_transcript: DataTypes.TEXT, 
    word_count_results: DataTypes.TEXT  
  }, {});
  UserData.associate = function(models) {
    // associations can be defined here
  };
  return UserData;
};

    //link_to_audio: DataTypes.STRING, //link to audiofile
    //audio_transcript: DataTypes.TEXT, 
    //word_count_results: DataTypes.TEXT  
    // NOTE word_count_results : 
    //Stringify the object before saving to the database !
    //parse the text to turn it into an object when loading !