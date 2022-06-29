class BridgeCrossing{
    constructor(){
        this.declareVariable();
        this.initialization();
    }

    declareVariable(){
        this.noProcess=true;
        this.side='left';
        this.selectedItems=[];
        this.thumbs=document.querySelectorAll('.thumbs');
        this.lamp=document.querySelector('#lamp');
        this.goButton=document.querySelector('#btn');
        this.allTimes = [1,2,4,6,8,12];
        this.leadingLampPosition1 = 280;
        this.timeCounter = document.querySelector('#time');
    }
    initialization(){
        this.timeCounter.value = 30;
        for(let i=0; i<this.thumbs.length; i++){
            this.thumbSelection(this.thumbs[i])
        }
        this.goProcess();
        this.resetButton();
    }

    thumbSelection(item){
        let $this=this;
        item.addEventListener('click', function(){
            if(
                $this.noProcess && 
                !item.classList.contains('disabled') &&
                item.classList.contains($this.side)
            ){
                $this.noProcess=false;
                if($this.selectedItems.indexOf(+item.dataset.id)>=0){
                    item.classList.remove('selected')
                    //delete selected items
                    delete $this.selectedItems[$this.selectedItems.indexOf(+item.dataset.id)]
                    //array key reset
                    $this.selectedItems = $this.selectedItems.filter(function (a) {
                        return a !== undefined;
                    });
                    if($this.lamp.dataset.pos==1){
                        for(let i=0; i<$this.thumbs.length;i++){
                            if($this.thumbs[i].classList.contains('disabled')){
                                $this.thumbs[i].classList.remove('disabled');
                            }
                        }
                    }
                }
                else if($this.selectedItems.length<2){
                    item.classList.add('selected')
                    $this.selectedItems.push(+item.dataset.id)
                    if($this.lamp.dataset.pos==1){
                        if($this.selectedItems.length>=2){
                            for(let i=0; i<$this.allTimes.length;i++){
                                if(!$this.selectedItems.includes($this.allTimes[i])){
                                    document.querySelector('.thumb-'+$this.allTimes[i]).classList.add('disabled');
                                }
                            }
                        }
                    }
                }
                $this.noProcess=true;
            }
        })
    }


    resetButton(){
        document.getElementById('reset').addEventListener('click', function(){
            location.reload();
        })
    }

    goProcess(){
        let $this= this;
        $this.goButton.addEventListener('click', function(){
            if($this.noProcess && $this.selectedItems.length > 0){
                $this.noProcess=false;
                let character1 = document.querySelector('#cha-'+$this.selectedItems[0]);
                let character2 = false;
                let targetSpeed = $this.selectedItems[0];
                if($this.selectedItems.length==2){
                    if($this.selectedItems[0] > $this.selectedItems[1]){
                        character1 = document.querySelector('#cha-'+$this.selectedItems[0])
                        character2 = document.querySelector('#cha-'+$this.selectedItems[1])
                    }
                    else{
                        character1 = document.querySelector('#cha-'+$this.selectedItems[1])
                        character2 = document.querySelector('#cha-'+$this.selectedItems[0])
                        targetSpeed = $this.selectedItems[1];
                    }
                }
                if($this.side=='left'){
                    $this.left2Right(character1,character2,targetSpeed);
                }
                else{
                    $this.right2Left(character1,character2,targetSpeed);
                }
            }
        })
    }

    left2Right(character1,character2,targetSpeed){
        let $this = this;
        character1.style.transitionDuration="1s"
        character1.classList.remove('bg-position-1')
        character1.classList.add('bg-position-2')
        character1.style.left="270px"
        if(character2){
            character2.style.transitionDuration="1s"
            character2.classList.remove('bg-position-1')
            character2.classList.add('bg-position-2')
            character2.style.left="225px"
        }
        setTimeout(function(){
            character1.style.transitionDuration=targetSpeed+"s"
            character1.style.left="770px"
            $this.lamp.style.transitionDuration=targetSpeed+"s"
            $this.lamp.style.left="810px"
            if(character2){
                character2.style.transitionDuration=targetSpeed+"s"
                character2.style.left="725px"
            }
            setTimeout(function(){
                character1.style.transitionDuration="2s"
                character1.style.left=character1.dataset['point-2']+"px"
                if(character2){
                    character2.style.transitionDuration="2s"
                    character2.style.left=character2.dataset['point-2']+"px"
                }
                setTimeout(function(){
                    character1.classList.remove('bg-position-2')
                    character1.classList.add('bg-position-3')
                    if(character2){
                        character2.classList.remove('bg-position-2')
                        character2.classList.add('bg-position-3')
                    }
                    
                    for(let i=0; i<$this.thumbs.length;i++){
                        if($this.thumbs[i].classList.contains('selected')){
                            $this.thumbs[i].classList.remove('selected');
                            $this.thumbs[i].classList.remove('left');
                            $this.thumbs[i].classList.add('right');
                        }
                        else if(
                            $this.thumbs[i].classList.contains('left') &&
                            !$this.thumbs[i].classList.contains('disabled')
                        ){
                            $this.thumbs[i].classList.add('disabled')
                        }
                        else if(
                            $this.thumbs[i].classList.contains('right') &&
                            $this.thumbs[i].classList.contains('disabled')
                        ){
                            $this.thumbs[i].classList.remove('disabled')
                        }
                    }
                    $this.selectedItems= [];
                    $this.side='right';
                    if($this.timeCounter.value >=targetSpeed){
                        $this.timeCounter.value = $this.timeCounter.value - targetSpeed
                        $this.noProcess=true;
                    }
                    else{
                        $this.timeCounter.value = $this.timeCounter.value - targetSpeed
                        alert('You took more than 30 seconds');
                    }
                }, 2000)
            }, targetSpeed*1000)
        }, 1000)
    }

    right2Left(character1,character2,targetSpeed){
        let $this = this;
        character1.style.transitionDuration="2s"
        character1.classList.remove('bg-position-3')
        character1.classList.add('bg-position-4')
        character1.style.left="810px"
        if(character2){
            character2.style.transitionDuration="2s"
            character2.classList.remove('bg-position-3')
            character2.classList.add('bg-position-4')
            character2.style.left="855px"
        }
        setTimeout(function(){
            character1.style.transitionDuration=targetSpeed+"s"
            character1.style.left="300px"
            $this.lamp.style.transitionDuration=targetSpeed+"s"
            $this.lamp.style.left="310px"
            if(character2){
                character2.style.transitionDuration=targetSpeed+"s"
                character2.style.left="345px"
            }
            setTimeout(function(){
                character1.style.transitionDuration="1s"
                character1.style.left=character1.dataset['point-1']+"px"
                if(character2){
                    character2.style.transitionDuration="1s"
                    character2.style.left=character2.dataset['point-1']+"px"
                }
                setTimeout(function(){
                    character1.classList.remove('bg-position-4')
                    character1.classList.add('bg-position-1')
                    if(character2){
                        character2.classList.remove('bg-position-4')
                        character2.classList.add('bg-position-1')
                    }
                    
                    for(let i=0; i<$this.thumbs.length;i++){
                        if($this.thumbs[i].classList.contains('selected')){
                            $this.thumbs[i].classList.remove('selected');
                            $this.thumbs[i].classList.remove('right');
                            $this.thumbs[i].classList.add('left');
                        }
                        else if(
                            $this.thumbs[i].classList.contains('right') &&
                            !$this.thumbs[i].classList.contains('disabled')
                        ){
                            $this.thumbs[i].classList.add('disabled')
                        }
                        else if(
                            $this.thumbs[i].classList.contains('left') &&
                            $this.thumbs[i].classList.contains('disabled')
                        ){
                            $this.thumbs[i].classList.remove('disabled')
                        }
                    }
                    $this.selectedItems= [];
                    $this.side='left';
                    if($this.timeCounter.value >=targetSpeed){
                        $this.timeCounter.value = $this.timeCounter.value - targetSpeed
                        $this.noProcess=true;
                    }
                    else{
                        $this.timeCounter.value = $this.timeCounter.value - targetSpeed
                        alert('You took more than 30 seconds');
                    }
                }, 1000)
            }, targetSpeed*1000)
        }, 2000)
    }
    
}
let bridgeCrossing = new BridgeCrossing();