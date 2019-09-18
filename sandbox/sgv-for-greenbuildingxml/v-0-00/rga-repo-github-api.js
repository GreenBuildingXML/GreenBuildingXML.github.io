/* globals */
/* jshint esversion: 6 */
/* jshint loopfunc: true */


const RGA = {

	"script": {

		"copyright": "Copyright 2019 pushMe-pullYou authors.",
		"date": "2019-09-17",
		"description": "Get repos",
		"license": "MIT License",
		"title": "Repos viaGitHub API RGA",
		"urlHelpFile":
			"https://pushme-pullyou.github.io/tootoo14/js-14-08/tmp-template/tmp-template.md",
		"urlSourceCode":
			"https://github.com/pushme-pullyou/tootoo14/tree/master/js-14-08/tmp-template",
		"version": "0.14.08-2rga"

	}

};


RGA.user = 'pushMe-pullYou'; // case insensitive
RGA.urlGitHubApiRepos = 'https://api.github.com/users/' + RGA.user + '/repos';


RGA.getMenuReposUser = function( method ) {

	RGA.method = method;

	RGA.accessToken = localStorage.getItem( 'githubAccessToken' ) || '';

	const htm =
		`
			<details id=detRGA ontoggle="RGA.setMenuUserRepos();" >

				<summary id=RGAsumS >${ RGA.user } Repos</summary>

				<a href="${ RGA.urlHelpFile  }" style=float:right; >?</a>

				<div id=RGAdivRepos ></div>

			</details>

		`;

	return htm;

};


RGA.setMenuUserRepos = function( path = "" ) {

	const str = RGA.accessToken ? "?access_token=" + RGA.accessToken : "";

	RGA.urlGitHubApiRepos = `https://api.github.com/users/${ RGA.user }/repos`;

	const url = RGA.urlGitHubApiRepos + path + str;

	fetch( new Request( url ) )
	.then( response => response.text() )
	.then( text => RGA.callbackGitHubUserRepos( text ) );

};


RGA.callbackGitHubUserRepos = function( text  ) {

	const items = JSON.parse( text );

	if ( items.message ) { console.log( 'error', items.message ); return; }

	const htm = items.map( item =>
		`
			<div style=margin-top:8px; >
				<a href=JavaScript:RGA.method("${ item.name }"); >
					📁 ${ item.name }
				</a>
			</div>
		`
	).join( "" );

	RGAdivRepos.innerHTML = htm;

};