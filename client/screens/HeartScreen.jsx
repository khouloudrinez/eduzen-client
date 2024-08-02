import React, { useState ,useContext  } from "react";
import { View, Text, StyleSheet, TouchableOpacity , Dimensions } from "react-native";
import BottomNavBar from "../components/BottomNavBar"; // Adjust the path if necessary
import UpperNavBar from "../components/UpperNavBar";
import PourVous from "../BienComponent/PourVous";
import Articles from "../BienComponent/Article";
import Astuces from "../BienComponent/Astuces";
import Exercices from "../BienComponent/Exercices";
import { Video } from 'expo-av';
import video1 from '../assets/Videos/1.mp4';
import video2 from '../assets/Videos/2.mp4';
import { UserContext } from "./UserContext";
import Card from "./Card"; 

const data = [
  {
    id: '1',
    title: 'Vaincre le chaos : Pourquoi la gestion du temps est importante pour les étudiants',
    image: { uri: 'https://img.freepik.com/free-photo/schedule-alarm-clock-time-concept_53876-125407.jpg?t=st=1721303441~exp=1721307041~hmac=fdcce1fe01a4f407f354da688cf72eaa9675a82f45d09e5080967b2999e69fd5&w=996' },
    points: 20,
    category: 'Article',
    pointsEarned: 0,
    description: `
Jongler entre les devoirs scolaires, les activités parascolaires, la vie sociale et peut-être même un emploi à temps partiel - la vie étudiante peut ressembler à un tourbillon constant. Il n'est pas étonnant que rester organisé et gérer son temps puisse être un défi majeur. Mais maîtriser les techniques de gestion du temps est bien plus qu'éviter les sessions de bourrage de dernière minute. C'est un ingrédient clé pour la réussite scolaire, la réduction du stress et un sentiment de bien-être général.

Une gestion efficace du temps permet aux étudiants de prioriser leurs tâches de manière effective. Qu'il s'agisse de planifier un programme d'études, de prévoir du temps pour les devoirs ou de programmer des pauses pour se détendre, l'organisation garantit que rien n'est négligé. Cela permet d'éviter le sentiment d'être débordé et permet aux étudiants de se concentrer sur chaque tâche à accomplir. Le résultat ? Un travail de meilleure qualité, une meilleure compréhension et, en fin de compte, des résultats scolaires plus solides.

Au-delà des études, de solides compétences en gestion du temps permettent aux étudiants de maintenir un équilibre sain dans d'autres domaines de la vie. Grâce à un emploi du temps clair, les étudiants peuvent consacrer du temps aux activités sociales, aux loisirs et à l'exercice physique. Cet équilibre entre les efforts scolaires et le bien-être personnel est crucial pour prévenir l'épuisement et maintenir un état d'esprit positif. En maîtrisant leur temps, les étudiants gagnent en contrôle et en sentiment d'accomplissement, ce qui renforce leur confiance en soi et leur bien-être émotionnel général.

Alors, comment les étudiants peuvent-ils développer de meilleures compétences en gestion du temps ? Des outils tels que les agendas, les calendriers et les listes de tâches peuvent constituer un excellent point de départ. Apprendre à prioriser et à diviser les tâches importantes en tâches plus petites et plus faciles à gérer joue également un rôle clé. En fin de compte, trouver un système qui correspond à leur style d'apprentissage individuel est essentiel. En accordant la priorité à la gestion du temps et en développant ces précieuses compétences, les étudiants se préparent à la réussite, non seulement dans leur parcours scolaire, mais aussi dans la vie.
    `
  },
  {
    id: '2',
    title: 'Trouver l\'équilibre : L\'importance de concilier vie professionnelle et vie personnelle',
    image: { uri: 'https://img.freepik.com/free-photo/cheerful-businessman-with-hand-drawn-bulb_1134-513.jpg?t=st=1721306258~exp=1721309858~hmac=113da3a3052376a713c198f45e65cbba2f76078dd60ec9ebaa85e1828e5818dc&w=996' },
    points: 20,
    category: 'Article',
    pointsEarned: 0,
    description: `
Dans le tourbillon de la vie moderne, jongler entre les responsabilités professionnelles et les obligations personnelles peut sembler être un exercice d'équilibriste sans fin. Que vous soyez étudiant, employé ou entrepreneur, trouver un équilibre entre votre vie professionnelle et votre vie personnelle est crucial pour votre bien-être général et votre réussite à long terme.

Pourquoi l'équilibre est-il important ?

 Manquer d'équilibre entre votre vie professionnelle et votre vie personnelle peut avoir des conséquences néfastes sur votre santé mentale, physique et émotionnelle. Le stress chronique, l'épuisement professionnel et la négligence des relations personnelles ne sont que quelques-uns des effets négatifs potentiels d'une surcharge de travail.

En revanche, trouver un équilibre sain entre vos engagements professionnels et personnels peut vous apporter de nombreux avantages :

    - Amélioration du bien-être mental et physique : Un bon équilibre entre vie professionnelle et vie personnelle vous permet de réduire votre niveau de stress, d'améliorer votre humeur et de stimuler votre énergie. Cela peut également contribuer à renforcer votre système immunitaire et à réduire le risque de maladies chroniques.

    - Augmentation de la productivité et de la créativité : Lorsque vous êtes reposé et rechargé, vous êtes plus à même d'être productif et créatif au travail. Un bon équilibre entre vie professionnelle et vie personnelle vous permet de vous concentrer davantage, d'être plus efficace et de générer des idées innovantes.

    - Relations plus épanouissantes : Passer du temps de qualité avec vos proches et entretenir des relations saines est essentiel à votre bonheur. Un bon équilibre entre vie professionnelle et vie personnelle vous permet de consacrer du temps aux personnes qui vous sont importantes et de nouer des liens plus forts.

    - Développement personnel : En dehors du travail, vous avez le temps de poursuivre vos intérêts, de vous adonner à des loisirs et de développer de nouvelles compétences. Cela peut contribuer à votre croissance personnelle et à votre épanouissement général.

Comment trouver l'équilibre ?

Concilier vie professionnelle et vie personnelle n'est pas toujours facile, mais il existe plusieurs stratégies que vous pouvez mettre en œuvre pour y parvenir :

      - Fixez des limites claires : Définissez des heures de travail et respectez-les autant que possible. Évitez de consulter vos e-mails professionnels ou de travailler en dehors de ces heures.

      - Apprenez à dire non : Il est important de savoir refuser des demandes supplémentaires qui pourraient surcharger votre emploi du temps. N'hésitez pas à dire non à des tâches ou à des engagements qui vous empêcheraient de trouver un équilibre.

      - Planifiez votre temps : Créez un emploi du temps qui intègre à la fois vos engagements professionnels et personnels. Prévoyez du temps pour le travail, la famille, les amis, les loisirs et les soins personnels.

      - Déléguez et externalisez : Si possible, déléguez des tâches à des
    `
  },
  {
    id: '3',
    title: 'Hey les jeunes ! Prêts à booster votre bien-être mental ?',
    image: { uri: 'https://img.freepik.com/free-photo/blonde-girl-scratching-head-thinking-about-something-graduation-gown-cap-looking-pensive_176474-82449.jpg?t=st=1721306519~exp=1721310119~hmac=3f340540fbc71d7622c549fea5f8bfb32e06d728e9cb294563afb260f6b5fe81&w=996' },
    points: 30,
    category: 'Astuces',
    pointsEarned: 0,
    description: `
Imaginez un super pouvoir qui vous permet de gérer le stress, d'affronter les défis avec confiance et de profiter pleinement de la vie.
Ce super pouvoir existe, et il est accessible à tous : il s'agit de prendre soin de votre bien-être mental !
Mais comment s'y prendre ?
Pas de panique, on est là pour vous guider !
Ce blog va devenir votre allié pour devenir un expert du bien-être mental.
Chaque semaine, on va vous proposer des défis fun et interactifs pour :
Comprendre vos émotions
Gérer le stress et l'anxiété
Développer une pensée positive
Cultiver des relations saines
Booster votre estime de soi
Et ce n'est pas tout !
On vous partagera aussi des astuces et des conseils pour un quotidien plus zen et positif.
Alors, prêts à relever le défi ?
Commençons dès maintenant !

Semaine 1 : À la découverte de ses émotions
Défi 1 :
Prenez quelques minutes pour identifier les émotions que vous ressentez en ce moment.
Comment vous sentez-vous ?
Joyeux, triste, en colère, énervé, stressé ?
Notez vos émotions sur un carnet ou dessinez-les.
Défi 2 :
Créez une "boite à émotions".
Décorez une boîte ou un bocal et notez sur des petits papiers les différentes émotions que vous pouvez ressentir.
Quand vous ressentez une émotion forte, écrivez-la sur un papier et mettez-le dans la boîte.
Défi 3 :
A la fin de la semaine, sortez tous les petits papiers et comptez chaque émotion.
Trouvez une personne de confiance, un ami ou un membre de votre famille  et discutez de vos émotions.
Parler de ce que vous ressentez peut vous aider à mieux les comprendre et à les gérer.
N'oubliez pas :
Il est normal de ressentir toutes sortes d'émotions.
L'important est de savoir les identifier et de trouver des moyens sains de les gérer.
On se retrouve la semaine prochaine pour de nouveaux défis !
Ensemble, on peut créer un monde où le bien-être mental est accessible à tous les jeunes !

    `
  },
  {
    id: '4',
    title: 'Hey les jeunes ! Prêts à booster votre bien-être mental ?',
    image: { uri: 'https://img.freepik.com/free-photo/hand-holding-squared-smiling-faces_23-2148317138.jpg?t=st=1721306258~exp=1721309858~hmac=f869da141b919acc30b962de8437a71cc13a1f39fbb59f834f7ed6bfdf0ca824&w=740' },
    points: 30,
    category: 'Astuces',
    pointsEarned: 0,
    description: `
Choisir sa carrière est une étape cruciale et parfois intimidante dans la vie d'un jeune. Face à la multitude de possibilités, il est facile de se sentir perdu et submergé.
Ce blog a pour but de vous accompagner dans ce processus en vous offrant quelques astuces pour faire un choix éclairé et en accord avec vos aspirations.
1. Apprenez à vous connaître
Avant de vous pencher sur les différentes professions, il est essentiel de faire une introspection approfondie. Posez-vous des questions comme :
Qu'est-ce qui me passionne ?
Quels sont mes centres d'intérêt ?
Quelles sont mes valeurs ?
Dans quel environnement de travail me sentirais-je le plus à l'aise ?
Quelles sont mes compétences et mes aptitudes ?
Prenez le temps de réfléchir à vos expériences passées, vos réalisations et les moments où vous vous êtes senti le plus épanoui.
2. Explorez vos options
Une fois que vous avez une meilleure compréhension de vous-même, il est temps de découvrir le monde du travail. Renseignez-vous sur les différents secteurs d'activité, les métiers qui existent et les formations requises.
N'hésitez pas à :
Assister à des salons d'orientation professionnelle
Rencontrer des professionnels de différents domaines
Effectuer des stages ou des jobs d'été
Lire des biographies et des articles inspirants
3. Prenez votre temps et soyez patient
Choisir sa carrière n'est pas une course. Accordez-vous du temps pour réfléchir, explorer et mûrir votre décision. N'ayez pas peur de changer d'avis si vos aspirations évoluent.
4. Entourez-vous de personnes positives
Le soutien de votre entourage est crucial dans ce processus. Parlez à vos parents, vos amis, vos mentors ou des conseillers professionnels.
Leurs encouragements et leurs conseils avisés vous seront précieux.

5. N'oubliez pas que l'apprentissage est un processus continu
Le monde du travail est en constante évolution. Soyez prêt à continuer à apprendre et à développer de nouvelles compétences tout au long de votre carrière.

Choisir sa carrière est un voyage, pas une destination. Profitez de ce processus pour découvrir vos passions, vos talents et vos aspirations. Avec de la réflexion, de la persévérance et un esprit ouvert, vous trouverez la voie qui vous mènera vers un avenir épanouissant et réussi.

    `
  },
  {
    id: '5',
    title: 'Exercices pour améliorer votre bien-être physique',
    video: video1 ,
    points: 50,
    pointsEarned: 0,
    category: 'Exercices',
    description: ''
  },
  {
    id: '6',
    title: 'Exercices pour améliorer votre bien-être physique',
    video: video2 ,
    points: 50,
    pointsEarned: 0,
    category: 'Exercices',
    description: ''
  },

];

const HeartScreen = ({ navigation, route }) => {
  const currentScreen = route.name;
  const [activeComponent, setActiveComponent] = useState('Component1');
  


  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'Component1':
        return <PourVous data={data} onCardPress={handleCardPress} />;
      case 'Component2':
        return <Articles data={data.filter(item => item.category === 'Article')} onCardPress={handleCardPress} />;
      case 'Component3':
        return <Astuces data={data.filter(item => item.category === 'Astuces')} onCardPress={handleCardPress} />;
      case 'Component4':
        return <Exercices data={data.filter(item => item.category === 'Exercices')} onCardPress={handleCardPress} />;
      default:
        return <PourVous data={data} onCardPress={handleCardPress} />;
    }
  };

  const handleCardPress = (id, category) => {
    const item = data.find(item => item.id === id);
    if (item) {
      navigation.navigate('CardDetails', { item });
    }
  };

  return (
    <View style={styles.container}>
      <UpperNavBar navigation={navigation} currentScreen={currentScreen} />
      <View style={[styles.navigationButtons, { marginTop: 55 }]}>
        <TouchableOpacity 
          style={[styles.navButtonContainer, activeComponent === 'Component1' && styles.activeButton]} 
          onPress={() => setActiveComponent('Component1')}
        >
          <Text style={activeComponent === 'Component1' ? styles.navButtonTexte : styles.navButtonText}>Pour Vous</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navButtonContainer, activeComponent === 'Component2' && styles.activeButton]} 
          onPress={() => setActiveComponent('Component2')}
        >
          <Text style={activeComponent === 'Component2' ? styles.navButtonTexte : styles.navButtonText}>Articles</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navButtonContainer, activeComponent === 'Component3' && styles.activeButton]} 
          onPress={() => setActiveComponent('Component3')}
        > 
          <Text style={activeComponent === 'Component3' ? styles.navButtonTexte : styles.navButtonText}>Astuces</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navButtonContainer, activeComponent === 'Component4' && styles.activeButton]} 
          onPress={() => setActiveComponent('Component4')}
        >
          <Text style={activeComponent === 'Component4' ? styles.navButtonTexte : styles.navButtonText}>Exercices</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {renderActiveComponent()}
      </View>
      <BottomNavBar navigation={navigation} currentScreen={currentScreen} />
    </View>
  );
};


const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    // backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  navButtonContainer: {

    // borderRadius: 20,
    // backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  activeButton: {
    color: '#20AD96',
    
  },
  navButtonText: {
    fontSize: 16,
    color: '#333333',
  },
  navButtonTexte: {
    fontSize: 16,
    color: '#20AD96',
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  componentContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  text: {
    fontSize: 18,
    color: "#000",
  },
});

export default HeartScreen;
