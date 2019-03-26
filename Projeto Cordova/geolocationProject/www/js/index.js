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
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
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

(function getCoords(){
    document.getElementById('infos-area').onsubmit = e => {
        e.preventDefault()
    }
    document.getElementById('show').onclick = function(){
        
        let ipt_ = document.getElementById('long')
        let ipt__ = document.getElementById('lat')
        
        var currentLatitude;
        var currentLongitude;

        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(getCoordinates);
            } else { 
                alert("Não foi possivel acessar a API de geolocalização :/");
            }
        }

        function getCoordinates(position) {
            currentLatitude = position.coords.latitude;
            currentLongitude = position.coords.longitude; 

            ipt_.value = currentLatitude
            ipt__.value = currentLongitude
            
        }
        getLocation()
    }
})()


app.initialize();