
// Convert dates from GithubAPI response to friendly HTML.
const displayLatestCommitTime = (test, timestamp, outputID, latestCommitObj, latestRepoObj) => {

    $('#' + outputID).removeAttr('data-eng data-sp');

    $('#' + outputID).removeClass('has-alt-text');

    if (test) {

        console.log('TEST GITHUB DATA');

        $('#' + outputID).html(

            `GITHUB API:<br><br>latest commit:</span><br><br><span id="repo-page" class="has-alt-text" data-sp="página de repositorio:&amp;nbsp;<a href=https://github.com/Jnavarr56/Portfolio-Site-V1>Portfolio-Site-V1</a>" data-eng="repo page:&amp;nbsp;<a href=https://github.com/Jnavarr56/Portfolio-Site-V1>Portfolio-Site-V1</a>">repo page:&nbsp;<a href="https://github.com/Jnavarr56/Portfolio-Site-V1">Portfolio-Site-V1</a></span><br><span id="commit-message" class="has-alt-text" data-sp="mensaje:&amp;nbsp;&amp;quotstuff&amp;quot" data-eng="message:&amp;nbsp;&amp;laquo;stuff&amp;raquo;">message:&nbsp;«stuff»</span><br><span id="commit-date" class="has-alt-text" data-sp="fecha:&amp;nbsp;8 de ene. de 2019 1:01" data-eng="date:&amp;nbsp;Jan 8, 2019 1:01 AM">date:&nbsp;Jan 8, 2019 1:01 AM</span><br><a id="commit-page" class="has-alt-text" data-sp="página de commit" data-eng="commit page" href="https://github.com/Jnavarr56/Portfolio-Site-V1/commit/ea0cdad7d4470d54023f6a349fd8f17e6c56745a">commit page</a><span class='blinking-cursor-red'>|</span>`

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
            <a id="commit-page" class="has-alt-text"></a><span class='blinking-cursor-red'>|</span>`

        );

        HTMLMap.createMultiple([

            {
                english: `GITHUB API:${HTMLMap.chars('break')(2)}latest commit:`,
                spanish: `GITHUB API:${HTMLMap.chars('break')(2)}commit más nuevo:`,
                elID: 'latest-commit-title'
            },
            {
                english: `repo page:${HTMLMap.chars('break')(1) + HTMLMap.chars('tab')(2)}<a href=${repoURL}>${repoName}</a>`,
                spanish: `página de repositorio:${HTMLMap.chars('break')(1) + HTMLMap.chars('tab')(2)}<a href=${repoURL}>${repoName}</a>`,
                elID: 'repo-page'
            },
            {
                english: `mensaje:${HTMLMap.chars('break')(1) + HTMLMap.chars('tab')(2)}${HTMLMap.chars('enQuote')}${formattedCommitMessage}${HTMLMap.chars('enQuote')}`,
                spanish: `message:${HTMLMap.chars('break')(1) + HTMLMap.chars('tab')(2)}${HTMLMap.chars('esLeftQuote')}${formattedCommitMessage}${HTMLMap.chars('esRightQuote')}`,
                elID: 'commit-message'
            },
            {
                english: `date:${HTMLMap.chars('break')(1) + HTMLMap.chars('tab')(2)}${englishDate.format('lll')}`,
                spanish: `fecha:${HTMLMap.chars('break')(1) + HTMLMap.chars('tab')(2)}${spanishDate.format('lll')}`,
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








