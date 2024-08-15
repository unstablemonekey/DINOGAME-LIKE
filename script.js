
// Game Container 
let gamewindow = document.querySelector('#gamewindow');

// checks is charater is on floor
let on_floor = true;
// gravity
const g = 1;
// enemy move speed 
let enemy_speed = 10;

// player initail velocity 
let vely = 0;

// game state 
let on_start = true;

// score 
let score = 0;

// gameplay state 
let gameplay = false;

// element to add 
let titletxt = document.createElement('span');
let player = document.createElement('div');
let score_text = document.createElement("span");
let obs = document.createElement('div');

// difficulty const 
const difficulty_no = 1;

// collision variable 
let new_collide = "120px";

// gameplay loop
function game() {

    player.id = 'player';
    
    vely = 0;
    player.style.top = '395px';

    // score borad 
    score_text.id = 'score';

    // adding score and player to the game 
    gamewindow.append(player);
    gamewindow.append(score_text);

    // Adding gravity 
    function gravity() {

        // check if player on floor to apply gravity 
        if (on_floor == false) {
            console.log("GRAVITY")
            // this variable takes the value of player pos 
            let currentTop = parseFloat(window.getComputedStyle(player).top)

            // here is adding up the velocity and then currentTop is change 
            vely += g
            currentTop += vely

            // here is check if player has reached the floor or not 
            if (currentTop >= 395) {
                vely = 0;
                currentTop = 395;
                on_floor = true;
            }
        
            // the player pos is set to currentTop 
            player.style.top = currentTop + 'px';

        }

        // this keeps repeating the function
        requestAnimationFrame(gravity);
    }

    // handles jumping 
    function jump() {
        // checks is player on the floor
        if (on_floor == true) {
            let pos = parseFloat(window.getComputedStyle(player).top);

            vely += -g
            pos += vely

            // is player pos is less than 200px falls down
            if (pos < 200) {
                vely = 0;
                on_floor = false;
            }

            player.style.top = pos + 'px';
        }
        // if player is on the floor then request to jump 
        if (on_floor) {
            requestAnimationFrame(jump);
        }
    }

    // checking for space being clicked 
    document.addEventListener('keypress', (event) => {
        if (event.code == "Space") {
            if (on_floor)
                vely = 0;
                jump()
        }
    });

    // spawns obstacle after 3 sec
    setTimeout(obstacle_spawing, 3000);

    function obstacle_spawing() {    
        // give it a id of obstacle which I already put values of in style.css 
        obs.id = 'obstacle';
        // giving it a position to spawn 
        obs.style.top = '395px';
        obs.style.left = '650px';


        // puts obstacle on the screen
        gamewindow.appendChild(obs);

        // handles obstacle movement 
        function obs_move() {
        
            obs_pos = parseFloat(window.getComputedStyle(obs).left);

            obs_pos -= enemy_speed;

            obs.style.left = obs_pos + 'px';

            // checks wheather player collided with obstacle 
            let collision_range = 10;
            if (obs_pos <= new_collide + collision_range && obs_pos >= new_collide - collision_range && player.style.top == "395px" || obs_pos == 120 && player.style.top == "395px") {

                // check if obstacle is there in the scene 
                if (obs.parentNode) {
                    vely = 0;
                    obs.parentNode.removeChild(obs);
                    gamewindow.removeChild(player);
                    gameplay = false;
                    on_floor = true;
                    gameover();
                    enemy_speed = 10;
                }
            // Obstacle touches the wall
            } else if (obs.style.left <= "-5px") {
                if (obs.parentNode) {
                    obs.parentNode.removeChild(obs);
                    requestAnimationFrame(obstacle_spawing);
                }
            }

            if (obs.parentNode) {
                requestAnimationFrame(obs_move)
            }
        }


        obs_move();
    }

    // handle the score 
    function score_board() {
        if (gameplay == true) {
            score++;
    
            score_text.textContent = "Score: " + score;

        
        }
        requestAnimationFrame(score_board);

    }
 
    // increasing difficulty after 15 sec 
    setInterval(
        function difficulty() { 
    
            if (enemy_speed < 15)
            {
    
                enemy_speed += difficulty_no;
    
            }
            
            new_collide = 120 - difficulty_no;

        }
    , 15000)
    gravity();
    score_board();
}


// on start  
function titlescreen() { 
    titletxt.textContent = 'PRESS ENTER TO START';
    titletxt.id = 'title-txt';

    gamewindow.append(titletxt);

}


// retry screen
function gameover() { 

    let retry_btn = document.createElement('button');
    retry_btn.textContent = 'RETRY';

    retry_btn.id = 'retry-btn';
    
    gamewindow.appendChild(retry_btn);

    retry_btn.addEventListener('click', () => {
        
        gamewindow.removeChild(retry_btn);
        on_floor = true;
        game();
        gameplay = true;
        score = 0;
        vely = 0;
        player.style.top = '395px';
        
    })

}

// thats the game when player press enter 
document.addEventListener('keypress', (event) => {
    if (on_start == true) {
        if (event.code == 'Enter'){
            game();
            vely = 0;
            on_start = false;
            gameplay = true;
            gamewindow.removeChild(titletxt);
        }
    }
    
});

titlescreen();