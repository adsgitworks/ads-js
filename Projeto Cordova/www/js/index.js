/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var database = {}

var app = {
    // Application Constructor
    initialize: function(cb) {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        cb()
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');

    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function showImages(){
    if(localStorage.images){
        document.getElementById('si').style.visibility = 'visible'
        Object.keys(database).forEach(e => {
            document.getElementById('si').insertAdjacentHTML('beforeend',`<img src="${database[e]}" class="slide"/>`)
        })
    }else {
        alert('Não há imagens para serem exibidas :/')
    }
}

function takePicture(t){
    
    navigator.camera.getPicture(sucess,fail, {
        quality: 100,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: (t <= 1 ? undefined : Camera.PictureSourceType.PHOTOLIBRARY)
        
    })
    function sucess(imgdata){
        document.getElementsByClassName('img')[0].src = "data:image/jpeg;base64,"+imgdata
        database[Object.keys(database).length] = "data:image/jpeg;base64,"+imgdata
        localStorage.images = JSON.stringify(database)
    }
   
    function fail(message) { 
        alert('Failed because: ' + message); 
    }
}

if(localStorage.images) {
    localStorage.images = ''
}

app.initialize(function(){
    document.getElementById("tp").addEventListener("click", function(){takePicture(1)}); 
    document.getElementById('sp').addEventListener('click', function(){takePicture(2)});
    document.getElementById('sf').addEventListener('click',showImages)
    document.getElementById('close').addEventListener('click',function(){
        document.getElementById('si').style.visibility = 'hidden'
        deleteChildrens(1,document.getElementById('si'))
    })
});

