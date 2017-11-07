var vm = new Vue({
  el: "#app", // Vue.jsを使うタグのIDを指定
  data: {
    // Vue.jsで使う変数はここに記述する
    YA : {
      YE : "",
      age : null,
      gender : "male",
    }
  },
  methods: {
    // Vue.jsで使う関数はここで記述する
    makeJSON: function(){
      let inputString = vm.YA.YE;
      console.log(inputString);
      let convertedString = encodeURIComponent(inputString)
      let text = convertedString;
      url = base_url + apikey_01 + "&out=json&text=" + text;
      console.log(url);

      $.ajax({
        crossDomain:true,
		    url : url,
		    type : "GET",
		    dataType : "jsonp",
		    success : function(data){
          console.log(data);
          const likedislike = data.likedislike;
          const joysad = data.joysad;
          const angerfear = data.angerfear;

          sendData = {
            YE:inputString,
            likedislike: likedislike,
            joysad: joysad,
            angerfear: angerfear,
            scalar: Math.round(Math.hypot(likedislike,joysad,angerfear)),
            CreatedAt: new Date(),
            age: vm.YA.age,
            gender: vm.YA.gender
          };

          console.log(sendData);
          socket.emit("client_to_server", {value : sendData});
          //e.preventDefault();
		    }
	    });
    }
  },
  created: function() {
    // Vue.jsの読み込みが完了したときに実行する処理はここに記述する
  },
  computed: {
    // 計算した結果を変数として利用したいときはここに記述する
  }
});
