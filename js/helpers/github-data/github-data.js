
// Convert dates from GithubAPI response to friendly HTML.
const displayLatestCommitTime = (test, timestamp, outputID, latestCommitObj, latestRepoObj) => {

    $('#' + outputID).removeAttr('data-eng data-sp');

    $('#' + outputID).removeClass('has-alt-text');

    if (test) {

        console.log('TEST GITHUB DATA');

        $('#' + outputID).html(

            `<span id="latest-commit-title" class="has-alt-text fade-in-new-language" data-sp="GITHUB API:${HTMLMap.chars('break')(2)}commit más nuevo:" data-eng="GITHUB API:${HTMLMap.chars('break')(2)}latest commit:">GITHUB API:${HTMLMap.chars('break')(2)}latest commit:</span><br><br><span id="repo-page" class="has-alt-text fade-in-new-language" data-sp="&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;página de repositorio:&amp;nbsp;<a href=https://github.com/Jnavarr56/IFBuddy>IFBuddy</a>" data-eng="&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;repo page:&amp;nbsp;<a href=https://github.com/Jnavarr56/IFBuddy>IFBuddy</a>">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;repo page:&nbsp;<a href="https://github.com/Jnavarr56/IFBuddy">IFBuddy</a></span><br><span id="commit-message" class="has-alt-text fade-in-new-language" data-sp="&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;mensaje:&amp;nbsp;&amp;quotThing&amp;quot" data-eng="&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;message:&amp;nbsp;&amp;laquo;Thing&amp;raquo;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;message:&nbsp;«Thing»</span><br><span id="commit-date" class="has-alt-text fade-in-new-language" data-sp="&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;fecha:&amp;nbsp;17 de dic. de 2018 16:43" data-eng="&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;date:&amp;nbsp;Dec 17, 2018 4:43 PM">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;date:&nbsp;Dec 17, 2018 4:43 PM</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a id="commit-page" class="has-alt-text fade-in-new-language" data-sp="página de commit" data-eng="commit page" href="https://github.com/Jnavarr56/IFBuddy/commit/500e0b1134bc5c7231ffe5770645a3678622a9b0">commit page</a><span class='blinking-cursor-red'>|</span>`

        );

    }
    else {

        console.log('REAL GITHUB DATA');

        let englishDate = moment(timestamp).tz(moment.tz.guess()).locale('en');

        let spanishDate = moment(timestamp).tz(moment.tz.guess()).locale('es');

        let repoName = latestCommitObj.url.split('/')[5], repoURL = latestRepoObj.html_url;

        let commitURL = latestCommitObj.html_url;

        let formattedCommitMessage = latestCommitObj.commit.message.length > 15 ? latestCommitObj.commit.message.slice(0, 15) + '...' : latestCommitObj.commit.message;

        $('#' + outputID).html(

           `<span id="latest-commit-title" class="has-alt-text"></span>
           ${HTMLMap.chars('break')(2)}
            <span id="repo-page" class="has-alt-text"></span>
            ${HTMLMap.chars('break')(1)}
            <span id="commit-message" class="has-alt-text"></span>
            ${HTMLMap.chars('break')(1)}
            <span id="commit-date" class="has-alt-text"></span>
            ${HTMLMap.chars('break')(1)}
            ${HTMLMap.chars('tab')(5)}<a id="commit-page" class="has-alt-text"></a>`

        );

        HTMLMap.createMultiple([

            {
                english: `GITHUB API:${HTMLMap.chars('break')(2)}latest commit:`,
                spanish: `GITHUB API:${HTMLMap.chars('break')(2)}commit más nuevo:`,
                elID: 'latest-commit-title'
            },
            {
                english: `${HTMLMap.chars('tab')(5)}repo page:${HTMLMap.chars('tab')(1)}<a href=${repoURL}>${repoName}</a>`,
                spanish: `${HTMLMap.chars('tab')(5)}página de repositorio:${HTMLMap.chars('tab')(1)}<a href=${repoURL}>${repoName}</a>`,
                elID: 'repo-page'
            },
            {
                english: `${HTMLMap.chars('tab')(5)}message:${HTMLMap.chars('tab')(1)}${HTMLMap.chars('esLeftQuote')}${formattedCommitMessage}${HTMLMap.chars('esRightQuote')}`,
                spanish: `${HTMLMap.chars('tab')(5)}mensaje:${HTMLMap.chars('tab')(1)}${HTMLMap.chars('enQuote')}${formattedCommitMessage}${HTMLMap.chars('enQuote')}`,
                elID: 'commit-message'
            },
            {
                english: `${HTMLMap.chars('tab')(5)}date:${HTMLMap.chars('tab')(1)}${englishDate.format('lll')}`,
                spanish: `${HTMLMap.chars('tab')(5)}fecha:${HTMLMap.chars('tab')(1)}${spanishDate.format('lll')}`,
                elID: 'commit-date'
            },
            {
                english: 'commit page',
                spanish: 'página de commit',
                elID: 'commit-page',
                url: commitURL
            }

        ]);

    }

}

// Perform GET request to GithubAPI. Has a test feature.
const getGithubData = (username, displayID, test) => {

    if (test) {

        displayLatestCommitTime(true, '2018-12-17T21:43:57Z', displayID);

        return;
    }

    let latestCommitData, mostRecentRepo;

    $.get(`https://api.github.com/users/${username}/repos`, 

        (data) => {
    
            mostRecentRepo = data.sort(sortAscend('created_at'))[0];
            
            $.get(mostRecentRepo.commits_url.replace('{/sha}', ''), (data) => {

                latestCommitData = data[0];

                displayLatestCommitTime(false, latestCommitData.commit.committer.date, displayID, latestCommitData, mostRecentRepo);

            });

        }

    );

}








