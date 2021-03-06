$(function() {
    $('#command').focus();
    setInterval("toggleCursor()",500);
    getIP();
});

function getIP(){
    $.ajax({
        url: "ip.php",
        context: document.body,
        success: function(data){
            $('body').append('<div id="client_ip" style="display:none">' + data + '</div>');
            var str = 'Hi, welcome to http://bibhas.in/<br />'
            str += 'Please enter "help" for the Complete list of available commands.' + '<br />';
            setConsoleVal('', str);
        }
    });
}
function toggleCursor(){
    $('#cursor').toggle();
}

function setConsoleVal(full_command, str){
    str = wrapConsoleLine(full_command + '<br />' + str);
    str += wrapConsoleLine('<span id="cursor">|</span>');
    $('#cursor').parent().parent().replaceWith(str);
}

function wrapConsoleLine(str){
    var urlPatt = /(http|https)\:\/\/[^\s]+/g;
    var cip = $('#client_ip').html();
    str = '<div class="cnsl-ln">anonymous@' + cip + ':~$ <strong>' + str + '</strong></div>'
    return str;
}

function execute(){
    var full_command = $.trim($('#command').val());
    var comm_arr = full_command.split(' ');
    var comm = comm_arr[0];
    
    switch(comm){
        case 'clear':
            location.reload();
            break;
        case 'help':
            var str = 'Command list:<br />'
            str += 'help: Complete command list' + '<br />';
            str += 'whoareyou: Prints who I am.' + '<br />';
            str += 'mail: Mail me!' + '<br />';
            str += 'blog open: Opens my blog in a new tab.' + '<br />';
            str += 'github open: Opens my Github profile in a new tab.' + '<br />';
            str += 'search: Searches Google, Duckduckgo and Bing in new tabs for any following keyword(s).' + '<br />';
            str += 'linuxdl: Downloads Linux distro of your choice(Only Ubuntu is available now).<br />'
            str += 'ip: Prints your IP.' + '<br />';
            str += 'clear: Resets this console.' + '<br />';
            setConsoleVal(full_command, str);
            break;
        case 'whoareyou':
            setConsoleVal(full_command, 'Hi, I am Bibhas. A small-time developer and geek from Kolkata, India. Nice to see you here. :)');
            break;
        case 'mail':
            setConsoleVal(full_command, 'Helping you mail me. :D');
            location.href="mailto:me@bibhas.in&body=Hello!"; 
            window.setTimeout(function () { location.href="newPage.html" }, 0); 
            break;
        case 'whoami':
            setConsoleVal(full_command, 'I don\'t know yet.');
            break;
        case 'ip':
            var ip = $('#client_ip').html();
            setConsoleVal(full_command, ip);
            break;
        case 'blog':
            if(comm_arr.hasOwnProperty(1)){
                switch(comm_arr[1]){
                    case 'open':
                        setConsoleVal(full_command, 'Openning the ' + comm + ' url in a new tab...');
                        window.open('http://bibhas.in/blog/');
                        break;
                    default:
                        setConsoleVal(full_command, 'Invalid option "' + comm_arr[1] + '"');
                }
            }else{
                setConsoleVal(full_command, 'My blog is at http://bibhas.in/blog/. enter "blog open" to open the blog in a new tab.');
            }
            break;
        case 'github':
            if(comm_arr.hasOwnProperty(1)){
                switch(comm_arr[1]){
                    case 'open':
                        setConsoleVal(full_command, 'Openning the ' + comm + ' url in a new tab...');
                        window.open('https://github.com/iambibhas');
                        break;
                    default:
                        setConsoleVal(full_command, 'Invalid option "' + comm_arr[1] + '"');
                }
            }else{
                setConsoleVal(full_command, 'My github username is "iambibhas". Profile is at https://github.com/iambibhas. Enter "github open" to open my github profile in a new tab.');
            }
            break;
        case 'hello':
            setConsoleVal(full_command, 'Hi. :)');
            break;
        case 'search':
            var q = '';
            for(var i=1; i<comm_arr.length; i++){
                q += comm_arr[i] + ' ';
            }
            q = $.trim(q);
            window.open('http://www.bing.com/search?setmkt=en-US&q=' + q);
            window.open('https://duckduckgo.com/?q=' + q);
            window.open('https://www.google.co.in/search?ix=sea&ie=UTF-8&q=' + q);
            setConsoleVal(full_command, 'Searching for \"' + q + '\"');
            break;
        case 'linuxdl':
            console.log(comm_arr);
            var helpstring = '';
            if(!comm_arr.hasOwnProperty(1)){
                helpstring += 'command structure - <br />';
                helpstring += 'linuxdl [ubuntu [12.04 [alternate [i386 [torrent]]]]] <br />';
            }
            if(comm_arr[1] == 'ubuntu'){
                var disturl = 'http://releases.ubuntu.com';
                var version = '';
                var build = '';
                var platform = '';
                var format = 'iso';
                if(!comm_arr.hasOwnProperty(2)){
                    version = '12.04';
                }else if(comm_arr[2]!=''){
                    version = comm_arr[2];
                }

                if(!comm_arr.hasOwnProperty(3)){
                    build = 'alternate';
                }else if(comm_arr[3]!=' '){
                    build = comm_arr[3];
                }

                if(!comm_arr.hasOwnProperty(4)){
                    platform = 'i386';
                }else if(comm_arr[4]!=' '){
                    platform = comm_arr[4];
                }

                if(!comm_arr.hasOwnProperty(5)){
                    format = 'iso';
                }else if(comm_arr[5]!='iso'){
                    format = 'iso.' + comm_arr[5];
                }
                // http://releases.ubuntu.com/12.04/ubuntu-12.04-alternate-amd64.iso
                disturl += "/" + version + "/" + "ubuntu" + "-" + version + "-" + build + "-" + platform + "." + format;
                setConsoleVal(full_command, "Downloading " + disturl);
                window.open(disturl);
            }
            setConsoleVal(full_command, helpstring);
            break;
        default:
            setConsoleVal(full_command, 'Invalid command.');
    }
    $('#command').val('');
    $('#console').scrollTop(99999);
    $('#command').focus();
    return false;
}
