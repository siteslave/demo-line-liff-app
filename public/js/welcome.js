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

document.addEventListener("DOMContentLoaded", function () {

  app.dialog.preloader();

  const liff_id = document.getElementById('txt_liff_id').value;

  liff
    .init({ liffId: liff_id })
    .then(() => {
      if (liff.isInClient()) {
        liff.closeWindow();
      } else {
        liff.ready.then(() => {
          liff
            .getProfile()
            .then((profile) => {
              alert(JSON.stringify(profile));
              app.dialog.close();
            }).catch((err) => {
              app.dialog.close();
              app.dialog.alert('เกิดข้อผิดพลาด');
            });
        });
      };
    });
});
