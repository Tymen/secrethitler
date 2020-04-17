import React, {Component} from 'react';

export default class GameRule extends Component {
    render() {
        return (
            <div className="container">
                <img className="home-logo" src="images/Secrethitler-no-bg.png"/>
                <div className="row gamerule">
                    <div className="col-12 page-title">
                        <img className="gamerule-bolletjes" src="images/uitleg-bolletjes.svg"/>
                        <h1 className="text-center">Over ons:</h1>
                    </div>
                    <div className="col-6 mb-5">
                        <div className="title"><h1>- In het spel:</h1></div>
                        <div className="text"><p>In het spel heb je een president en een
                            kanselier. Deze hebben dan in die ronde
                            de kans policy kaarten te kiezen.
                        </p></div>
                    </div>
                    <div className="col-6 mb-5">
                    <div className="title"><h1>- Policy kaarten:</h1></div>
                    <div className="text"><p>Blauwe “Policy kaarten”:>
                        Deze wil je als liberaal</p>

                        <p>Rode “Policy kaarten”:
                        Deze wil je als fascist juist graag op het bord krijgen. Zodra er zes rode policy kaarten op het bord liggen winnen de fascisten.
                        <img className="liberal" width="170" src="images/gamerule/liberal-article.png"/>
                        <img className="facist" width="280" src="images/gamerule/facist-article.png"/>
                    </p></div>
                </div>

                    <div className="col-6 mb-5">
                        <div className="title"><h1>- Het bord:</h1></div>
                        <div className="text"><p>Het bord bevat twee kanten de “rode” en
                            de “blauwe“ kant. Zoals je hierboven
                            kunt lezen wil je als een liberaal de blauwe kant vullen
                            met de blauwe policykaarten en de fascisten willen juist
                            de rode kant vullen met de rode policykaarten.
                            Voor de rode kant gelden nog een paart extra
                            regels/opties. Deze verschillen voor de hoeveel spelers
                            die meedoen tijdens het spel.

                        </p></div>
                    </div>
                    <div className="col-6 mb-5">
                        <div className="title"><h1>- Voor 7 tot 8 spelers:</h1></div>
                        <div className="text"><p>Geld er dat bij de tweede rode policykaart die op het bord gelegd word de president iemand mag kiezen om zijn identiteit kaart te zien(hierover mogen beide spelers over liegen).
                            Bij de derde rode policykaart die op het bord gelegd word mag de huidige president de nieuwe president kiezen.

                            De fascisten weten van elkaar dat ze fascisten zijn maar Hitler weet niet wie de fascisten zijn.
                        </p></div>
                    </div>

                    <div className="col-6 mb-5">
                        <div className="title"><h1>- Voor 5 tot 6 spelers:</h1></div>
                        <div className="text"><p>Geld er dat bij de derde rode policy kaart de vorige president de drie policykaarten mag inzien. Zo kan hij kijken of er een fascist tussen de huidige president en kanselier zit (de vorige president kan zelf een fascist zijn).
                            Ook geld er hier dat Hitler en de fascisten van elkaar weten dat ze fascisten of Hitler zijn.
                        </p></div>
                    </div>
                    <div className="col-6 mb-5">
                        <div className="title"><h1>- Voor 9 tot 10 spelers:</h1></div>
                        <div className="text d-block"><p>Geld er dat bij de eerste rode policykaart de huidige president iemand mag kiezen om zijn identiteit kaart te zien(hierover mogen beide spelers over liegen).
                            Bij de tweede rode policykaart mag de huidige president wederom iemand kiezen om zijn identiteit kaart te zien(hierover mogen beide spelers over liegen).
                            Bij de derde rode policykaart mag de huidige president de nieuwe president kiezen.</p>
                            <img className="" width="150" src="images/gamerule/6-8Players.png"/>
                            <img className="" width="150" src="images/gamerule/5-6Players.png"/>
                            <img className="" width="150" src="images/gamerule/Kat-pictogram.png"/>
                            <p>De fascisten weten van elkaar dat ze fascisten zijn maar Hitler weet niet wie de fascisten zijn.
                        </p></div>
                    </div>

                    <div className="col-6 mb-5">
                        <div className="title"><h1>-  Regels zonder een x aantal spelers:</h1></div>
                        <div className="text"><p>Bij de vijfde policykaart mag diegene die hem oplegt iemand vermoorden als liberaal wil je een fascist doden en als fascist juist een liberaal. Dit geld ook voor de zesde rode policykaart.
                            Als je dood geschoten word doe je niet meer mee met het spel!
                        </p></div>
                    </div>
                    <div className="col-6 mb-5">
                        <div className="title"><h1>
                            - Tijdens het spel:
                        </h1></div>
                        <div className="text"><p>Elke ronde word er een nieuwe president aangesteld (de eerste keer is dit random) deze word telkens met de klok mee aangesteld. De president kiest vervolgens een kanselier. Vervolgens gaan alle spelers stemmen of zij de kanselier goedkeuren. Hiervoor heb je een “Ja” en “Nein” kaarten. Als er meer dan 50% ja gekozen heeft mogen ze de policy kaarten pakken.

                            Als er minder dan 50% ja kiest noemen we dit een “fail” als dit drie keer gebeurd, dan word de bovenste policykaart omgedraaid en op het bord gelegd dit kan een rode of blauwe zijn.

                            De president krijgt drie policykaarten en moet daar dan één policy kaart eruit halen deze doet dan niet meer mee, vervolgens geeft hij de overgebleven twee kaarten door aan de kanselier. De kanselier mag er dan weer één van de twee eruit halen. De kaart die overblijft word vervolgens op het bord gelegd.
                        </p></div>
                    </div>

                    <div className="col-6 mb-5">
                        <div className="title"><h1>
                            - Het is spel eindigt wanneer:</h1></div>
                        <div className="text"><p>-	Hitler vermoord is (liberalen winnen)
                            -	De rode kant van het bord vol ligt met rode
                            policykaarten(fascisten winnen)
                            -	De blauwe kant van het bord vol ligt met blauwe
                            policykaarten(liberalen winnen)
                            -	Als Hitler de kanselier is als er 4 of meer rode
                            policykaarten liggen op het bord
                        </p></div>
                    </div>
                    <div className="col-6 mb-5">
                        <div className="title"><h1>
                            - Tijdens het spel:
                        </h1></div>
                        <div className="text"><p>In het spel heb je een president en een
                            kanselier. Deze hebben dan in die ronde
                            de kans policy kaarten te kiezen.
                        </p></div>
                    </div>
                </div>
            </div>
        );
    }
}

