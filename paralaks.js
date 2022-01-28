const section = document.getElementById('background');

      section.addEventListener('mousemove', (e) =>{
        const moveX = ((e.pageX * -1)/ 40);

        section.style.backgroundPosition = moveX + 'px ';
      });