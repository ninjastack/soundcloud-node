var util=require('util'),
    querystring=require('querystring'),
    rest=require('restler'),
    cloudsound=exports;
    
//me resources
cloudsound.me=function(token,callback){
    jsonRequest('/me.json',{oauth_token:token},callback,function(){
        callback({});    
    });
};
//all tracks for user
cloudsound.myTracks=function(token,callback){
    jsonRequest('/me/tracks.json',{oauth_token:token},callback,function(){
        callback([]);    
    });
};
//private streamable tracks
cloudsound.myPrivateStreamableTracks=function(token,callback){
    jsonRequest('/me/tracks.json',{oauth_token:token,filter:'private,streamable'},function(tracks){
        var newTracks=[],
	    i=0;
        if(tracks && tracks.length>0){
            for(;i<tracks.length;i++){
                var track=tracks[i];
                if(track.title){
                    var newTrack={
                        name:track.title,
                        url:track.stream_url+'?oauth_token='+token
                    };
                    newTracks[i]=newTrack;    
                }
            }
        }
        callback(newTracks);
    },function(){
        callback([]);
    });
};

var jsonRequest=function(resource,params,successCallback,errorCallback){
    rest.get('https://api.soundcloud.com'+resource+'?'+querystring.stringify(params))
        .on('complete',successCallback)
        .on('error',errorCallback);
};

