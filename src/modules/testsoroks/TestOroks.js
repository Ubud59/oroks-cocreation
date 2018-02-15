import React, { Component } from 'react';
import Slider from 'react-slick';

// à supprimer

class TestOroksComponent extends Component{
  render() {
    const settings = {
      autoplay: true,
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    }
    return (
      <div className='container'>
        <Slider {...settings}>

        <section>
          <div class="container py-3">
            <div class="card">
              <div class="row ">
                <div class="col-md-4">
                    <img src="/images/fitting_statique.png" class="w-100" height="50%" width="50%" />
                  </div>
                  <div class="col-md-8 px-3">
                    <div class="card-block px-3">
                      <h2 class="card-title">TEST D’ESSAYAGE – FITTING STATIQUE</h2>
                      <h3>Objectif :</h3>
                      <p className="cardtext">Evaluer les premières impressions ressenties par un utilisateur sur le taillant, la présence de gênes/inconforts en statique</p>

                      <h3>Nombre de testeurs nécessaire :</h3>
                      <p  className="cardtext">8 – 15 Pour observer les plus gros problèmes de Fitting</p>
                      <p  className="cardtext">25 – 30 Pour avoir plus de certitudes</p>

                      <h3>Principe du test :</h3>
                      <p  className="cardtext">Un produit est donné au testeur. Ce dernier l’enfile et donne ses impressions et terme de taillant, présence d’inconfort/gêne. Pour cela il à recourt à des échelles graduées mises à disposition par l’Ingénieur en charge de la réalisation du test. Ce test reproduit l’acte d’essayage en magasin.</p>

                      <h3>Durée du test :</h3>
                      <p  className="cardtext">5 – 15 min</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

        </section>

        <section>
          <div class="container py-3">
            <div class="card">
              <div class="row ">
                <div class="col-md-4">
                    <img src="/images/fitting_statique.png" class="w-100" height="50%" width="50%" />
                  </div>
                  <div class="col-md-8 px-3">
                    <div class="card-block px-3">
                      <h2 class="card-title">TEST D’ESSAYAGE – FITTING DYNAMIQUE</h2>
                      <h3>Objectif :</h3>
                      <p className="cardtext">Evaluer les premières impressions ressenties par un utilisateur</p>

                      <h3>Nombre de testeurs nécessaire :</h3>
                      <p  className="cardtext">8 – 15 Pour observer les plus gros problèmes de Fitting</p>
                      <p  className="cardtext">25 – 30 Pour avoir plus de certitudes</p>

                      <h3>Principe du test :</h3>
                      <p  className="cardtext">Un produit est donné au testeur. Ce dernier l’enfile en addition du reste de son équipement et test lors de ça session de pratique pour une durée donnée. A la fin du temps de test, il donne ses impressions et terme de taillant, présence d’inconfort/gêne. Pour cela il à recourt à des échelles graduées mises à disposition par l’Ingénieur en charge de la réalisation du test. Ce test reproduit la premier pratique suite à l’achat du produit</p>

                      <h3>Durée du test :</h3>
                      <p  className="cardtext">10 – 40 min</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

        </section>

        <section>
          <div class="container py-3">
            <div class="card">
              <div class="row ">
                <div class="col-md-4">
                    <img src="/images/test_fonction_terrain.png" class="w-100" height="50%" width="50%" />
                  </div>
                  <div class="col-md-8 px-3">
                    <div class="card-block px-3">
                      <h2 class="card-title">TEST FONCTION TERRAIN</h2>
                      <h3>Objectif :</h3>
                      <p className="cardtext">Evaluer une fonction sur le terrain de pratique ou sur une surface simulant la pratique (ex : tapis de course si test pour kalenji), en figeant plusieurs paramètres</p>

                      <h3>Nombre de testeurs nécessaire :</h3>
                      <p  className="cardtext">Mesure instrumentale (ex : fréquence cardiaque) : 10 personnes</p>
                      <p  className="cardtext">Mesure sensorielle subjective (ex : appréciation/ressenti) : 30 personnes minimum pour avoir du sens et 60 personnes pour valider de manière quasi certaine</p>
                      <p  className="cardtext">Mesure sensorielle objective (ex : Panel expert pour CUT) : 10-12 personnes avec entrainement au préalable</p>

                      <h3>Principe du test :</h3>
                      <p  className="cardtext">Un produit est donné au testeur. Ce dernier l’enfile et donne ses impressions et terme de taillant, présence d’inconfort/gêne. Pour cela il à recourt à des échelles graduées mises à disposition par l’Ingénieur en charge de la réalisation du test. Ce test reproduit l’acte d’essayage en magasin.</p>

                      <h3>Durée du test :</h3>
                      <p  className="cardtext">En fonction du test à réaliser</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

        </section>

        <section>
          <div class="container py-3">
            <div class="card">
              <div class="row ">
                <div class="col-md-4">
                    <img src="/images/test_durabilite.png" class="w-100" height="50%" width="50%" />
                  </div>
                  <div class="col-md-8 px-3">
                    <div class="card-block px-3">
                      <h2 class="card-title">TEST DURABILITE</h2>
                      <h3>Objectif :</h3>
                      <p className="cardtext">Evaluer l’usure du produit dans sa globalité et/ou sa durée de vie</p>

                      <h3>Nombre de testeurs nécessaire :</h3>
                      <p  className="cardtext">6 – 8 testeurs</p>

                      <h3>Principe du test :</h3>
                      <p  className="cardtext">Le testeur reçoit un produit. Il l’utilise de manière régulière (comme s’il l’avait acheté en magasin) lors de sa pratique. Chaque semaine il doit remplir un « journal de suivi » afin de faire un retour sur le produit. A la fin du test, le testeur doit remplir un questionnaire de fin de test afin d’évaluer le produit dans sa globalité. Si aucun problème qualité n’a été détecté sur le produit, l’Ingénieur, s’il n’a pas besoin de récupérer le produit, peut le laisser au testeur</p>

                      <h3>Durée du test :</h3>
                      <p  className="cardtext">4 à 6 semaines</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

        </section>

        <section>
          <div class="container py-3">
            <div class="card">
              <div class="row ">
                <div class="col-md-4">
                    <img src="/images/test_usage.png" class="w-100" height="50%" width="50%" />
                  </div>
                  <div class="col-md-8 px-3">
                    <div class="card-block px-3">
                      <h2 class="card-title">TEST D’USAGE</h2>
                      <h3>Objectif :</h3>
                      <p className="cardtext">Evaluer l’usage du produit dans sa globalité</p>

                      <h3>Nombre de testeurs nécessaire :</h3>
                      <p  className="cardtext">8 personnes minimum (90% défauts couverts)</p>

                      <h3>Principe du test :</h3>
                      <p  className="cardtext">Le testeur test un produit durant sa pratique. Il donne son ressenti et ses impressions sur le produit à la fin de son entrainement.</p>
                      <h3>Durée du test :</h3>
                      <p  className="cardtext">10 – 40 min</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

        </section>


        </Slider>
      </div>
    );
  }
}

export default TestOroksComponent;
