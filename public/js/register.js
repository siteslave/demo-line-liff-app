const app = new Framework7({
  el: '#app',
  theme: 'ios',
  colors: {
    primary: '#06c755',
  },
  dialog: {
    title: 'Health Station',
    buttonOk: 'ตกลง',
    buttonCancel: 'ยกเลิก'
  }
});

var userId;
var displayName;
var porfileUrl;

document.addEventListener("DOMContentLoaded", function () {

  app.dialog.preloader();

  const liff_id = document.getElementById('txt_liff_id').value;

  liff
    .init({ liffId: liff_id })
    .then(() => {
      if (!liff.isInClient()) {
        app.dialog.close();
        app.dialog.alert('กรุณาเปิดด้วยแอป LINE', function () {
          location.replace('https://r7.moph.go.th');
        });
      } else {
        liff.ready.then(() => {
          liff
            .getProfile()
            .then((profile) => {
              app.dialog.close();
              displayName = profile.displayName;
              userId = profile.userId;
              pictureUrl = profile.pictureUrl;

              const elDisplayName = document.getElementById('displayName');
              const elUserId = document.getElementById('userId');
              const elPictureProfile = document.getElementById('pictureProfile');

              elDisplayName.innerHTML = displayName;
              elUserId.innerHTML = userId;
              elPictureProfile.src = pictureUrl;

            }).catch((err) => {
              console.log(err);
              app.dialog.close();
              app.dialog.alert('เกิดข้อผิดพลาด');
            });
        });
      };
    });
});
