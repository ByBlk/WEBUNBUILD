import { useState, useMemo, useRef } from 'react';
import '../style/tutoFA.scss';
import { useNuiEvent } from '@hooks/nuiEvent';
import { fetchNui } from '@hooks/fetchNui';
import MediaCdn from '@/components/mediaCdn/mediaCdn';

const TutoFA = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    const helper = useRef<HTMLDivElement>(null);
    const helperKey = useRef<HTMLDivElement>(null);

    useNuiEvent("nui:hud:tuto-fa-open-form", () => {
        setShowForm(true);
    });

    useNuiEvent("nui:hud:tuto-fa-hide-step", () => {
        updateNotification("", "", false);
    });

    useNuiEvent("nui:hud:tuto-fa-open-step", (data: { step: number }) => {
        updateNotification(SpecialSteps[data.step].title, SpecialSteps[data.step].desc, true);
    });

    useNuiEvent("nui:hud:tuto-fa-open-step-custom", (data: { title: string, desc: string }) => {
        updateNotification(data.title, data.desc, true);
    });

    useNuiEvent("nui:hud:tuto-fa-go-step", (data: { step: number, desc: string }) => {
        if (steps[data.step]) {
            if (data.step !== currentStep + 1) {
                return;
            }
            setCurrentStep(data.step);
            updateNotification(steps[data.step].title, steps[data.step].desc, true);
            if (data.step === steps.length - 1) {
                setTimeout(() => {
                    updateNotification("", "", false);
                }, 5000);
            }
        }
    });

    useNuiEvent("nui:hud:tuto-fa-hide-notification", () => {
        handleIKey();
    });

    const SpecialSteps = useMemo(() => {
        return [
            {
                title: "Braquage d'ATM",
                desc: "Frappe l'ATM avec ton arme blanche pour faire sortir l'argent",
            },
            {
                title: "Racket",
                desc: "Braque avec ton couteau pour faire peur à la personne",
            },
            {
                title: "Racket",
                desc: "Rattrape la personne et plante là pour la mettre au sol",
            },
            {
                title: "Racket",
                desc: "Défends toi et plante la personne pour la mettre au sol",
            },
        ];
    }, []);

    const steps = useMemo(() => {
        return [
            {
                title: 'Téléphone',
                desc: 'Pour utiliser ton téléphone, appuie sur la touche <strong>W</strong>',
            },
            {
                title: 'Véhicule de location',
                desc: 'Récupère un véhicule pour pouvoir te déplacer',
            },
            {
                title: 'Permis de conduire',
                desc: 'Passe ton permis de conduire pour être en règle',
            },
            {
                title: 'Pièce d\'identité',
                desc: 'Récupère ta pièce d\'identité et ton permis au poste de police',
            },
            {
                title: 'Magasin de vêtements',
                desc: 'Rends-toi au binco pour te faire une tenue de travail',
            },
            {
                title: 'Épicerie',
                desc: 'Procure toi à boire et à manger au LTD le plus proche',
            },
            {
                title: 'Job Center',
                desc: 'Rends-toi au job center pour commencer à travailler',
            },
            {
                title: 'Tutotiel terminé',
                desc: 'Tu peux désormais jouer librement sur le serveur',
            }
        ];
    }, []);

    const updateNotification = (title: string, desc: string, visible: boolean) => {
        const _helper = helper.current as HTMLDivElement;
        const _helperKey = helperKey.current as HTMLDivElement;

        if (_helperKey.style.display === 'block') {
            handleIKey();
        };

        _helper.classList.remove('slideFromLeft');
        _helper.classList.add('slideToLeft')
        setTimeout(() => {
            setTitle(title);
            setDesc(desc);
            if (visible) {
                _helper.classList.remove('slideToLeft');
                _helper.classList.add('slideFromLeft');
            }
            _helper.style.display = visible ? 'block' : 'none';
        }, 500);

        setTimeout(() => {
            handleIKey();
        }, 10000);
    };

    const handleIKey = () => {
        const _helper = helper.current as HTMLDivElement;
        const _helperKey = helperKey.current as HTMLDivElement;
        if (!title) return;

        if (_helper?.style.display === 'block') {
            _helper.classList.remove('slideFromLeft');
            _helper.classList.add('slideToLeft')
            setTimeout(() => {
                _helper.classList.remove('slideToLeft');
                _helper.classList.add('slideFromLeft');
                _helper.style.display = 'none';
                _helperKey.style.display = 'block';
            }, 300);
        } else {
            _helper.classList.remove('slideToLeft');
            _helper.classList.add('slideFromLeft');
            _helper.style.display = 'block';
            _helperKey.style.display = 'none';
        }

    }

    return (
        <div className="tuto-fa">
            <div id="tuto-form" style={{ display: showForm ? 'flex' : 'none' }}>
                <h1>Tutoriel</h1>
                <p>
                    Souhaites-tu suivre les premières étapes pour débuter correctement ton
                    aventure ?
                </p>
                <span>
                    <button id="yes" onClick={() => {
                        fetchNui('nui:hud:tuto-fa-disable-focus');
                        fetchNui('nui:hud:tuto-fa-start-tuto');
                        updateNotification(steps[0].title, steps[0].desc, true);
                        setTimeout(() => {
                            updateNotification(steps[1].title, steps[1].desc, true);
                            setCurrentStep(1);
                        }, 5000);
                    }}>Débuter</button>
                    <button id="no" onClick={() => {
                        setShowForm(false);
                        fetchNui('nui:hud:disable-focus');
                    }}>Passer</button>
                </span>
            </div>
            <div id="helper" ref={helper}>
                <h2 dangerouslySetInnerHTML={{ __html: title }}></h2>
                <p dangerouslySetInnerHTML={{ __html: desc }}></p>
                <MediaCdn path={'assets/hud'} name={'info.webp'} />
            </div>
            <div id="helper-key" ref={helperKey}>
                <MediaCdn path={'assets/hud'} name={'info.webp'} />
            </div>
        </div>
    );
};

export default TutoFA;