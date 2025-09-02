import "swiper/swiper-bundle.css";
import "./index.scss";

import React, {useEffect, useRef, useState} from "react";
import {fetchNui, useNuiEvent} from "@/hook";
import {IAutoEcoleData, IAnswer} from "./types";

const time_test = 30; // 10 secondes

const Index: React.FC = () => {

    const [volume, setVolume] = useState("50");
    const [time, setTime] = useState(time_test); // 120
    const [questionSelected, setQuestionSelected] = useState(0);
    const [questions, setQuestions] = useState<IAutoEcoleData | null>(null);
    const [status, setStatus] = useState(0); // default 1
    const [note, setNote] = useState(0); // 0
    const intervalQuestion = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState<IAutoEcoleData[] | null>(null);


    const handleClick = async (answerindex: number) => {
        const questions_ = {...questions} as IAutoEcoleData;
        questions_.answer[answerindex].selected = !questions_.answer[answerindex].selected;

        setQuestions(questions_);
    };

    useNuiEvent('nui:autoecole:visible', (status: boolean) => {
        setVisible(status);
    });

    useNuiEvent('nui:autoecole:data', (data: any) => {
        setData(data);
    })

    const handleClose = () => {
        setVisible(false);
        setData(null);
        setStatus(0);
        setQuestionSelected(0);
        setQuestions(null);
        setNote(0);
        fetchNui('nui:closeAutoecole');
    }

    const sendQuestions = () => {
        fetchNui('autoecole__callback', {
            action: "sendQuestions",
            questions: questions,
            time: time,
        });
    };

    const nextQuestion = async () => {
        if (status == 1) {
            sendQuestions();
            const progressbar = Array.from(
                document.getElementsByClassName("autoecole_container_progress_inner") as HTMLCollectionOf<HTMLElement>,
            );
            if (typeof progressbar[0] !== "undefined") {
                progressbar[0].style.transition = "";
                progressbar[0].style.width = "100%";
            }
            clearInterval(intervalQuestion.current);
            if (data && questionSelected >= data.length - 1) {
               await takeNote();
            } else {
                setQuestionSelected(questionSelected => (questionSelected = questionSelected + 1));
            }
        }
    };

    const takeNote = async () => {

        try {
            const result = await fetchNui<{ note: string }>(
                'autoecole__callback',
                {
                    action: "takeNote"
                },
                {
                    data: {
                        note: '10'
                    }
                }
            );

			setNote(parseInt(result.note));
			setStatus(2);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        if (status === 1) {
            setQuestions(data ? data[questionSelected] : null);
            setTime(time_test);
            const progressbar = Array.from(
                document.getElementsByClassName("autoecole_container_progress_inner") as HTMLCollectionOf<HTMLElement>,
            );

            const interval_2 = setInterval(() => {
                if (status === 1) {
                    progressbar[0].style.transition = "width " + time_test + "s ease-in-out";
                }
                clearInterval(interval_2);
            }, 100);

            const interval_ = setInterval(() => {
                if (status === 1) {
                    progressbar[0].style.width = "0px";
                }
                clearInterval(interval_);
            }, 100);
            const intervalChangeQuestion = setInterval(() => {
                if (status === 1) {
                    nextQuestion();
                }
                clearInterval(intervalChangeQuestion);
            }, time_test * 1000);
            intervalQuestion.current = intervalChangeQuestion;
        }
    }, [questionSelected, status]);

    return visible ? (
        <div
            style={{
                background: "transparent url('https://cdn.eltrane.cloud/3838384859/old_a_trier/autoecole/tablette.webp') 0% 0% no-repeat padding-box",
            }}
            className="autoecole">
            <div className="autoecole_container">
                <div className="autoecole_container_header">
                    <div className="autoecole_container_header_session">
                        <img src="https://cdn.eltrane.cloud/3838384859/old_a_trier/autoecole/questions-et-reponses.webp"></img>
                        <div className="autoecole_container_header_session_text">
                            {status === 0 &&
                                <span className="autoecole_container_header_text">Début de la session</span>}
                            {status === 1 && (
                                <span className="autoecole_container_header_text">
									Question :{" "}
                                    <span className="note">
										<b className="orangeScore">{questionSelected + 1}</b> / {data?.length}
									</span>
								</span>
                            )}
                            {status === 2 && <span className="autoecole_container_header_text">Résultats</span>}
                        </div>
                    </div>
                    <div className="autoecole_container_header_right">
                        <div className="autoecole_container_header_right_sound">
                            <div className="slidecontainer">
                                <input
                                    type="range"
                                    min="1"
                                    max="100"
                                    value={volume}
                                    className="slider"
                                    id="myRange"
                                    onChange={event => setVolume(event.target.value)}
                                />
                            </div>
                            <img
                                src="https://cdn.eltrane.cloud/3838384859/old_a_trier/autoecole/symbole-dinterface-daugmentation-du-volume.webp"
                                className="button"></img>
                        </div>

                        <img
                            onClick={() => handleClose()}
                            src="https://cdn.eltrane.cloud/3838384859/old_a_trier/autoecole/logout.webp"
                            className="button"></img>
                    </div>
                </div>
                {status === 1 && (
                    <div className="autoecole_container_progress">
                        <div className="autoecole_container_progress_inner"></div>
                    </div>
                )}
                {status === 0 && (
                    <div className="autoecole_container_middle">
						<span className="autoecole_container_middle_title">
							Examen du <b className="orangetext">code de la route</b>
						</span>
                        <div className="autoecole_container_middle_text">
							<span className="autoecole_container_middle_text_span">
								Vous vous apprêtez à démarrer une <b className="orangetext">session d'examen du code de la route</b>.
							</span>

                            <span className="autoecole_container_middle_text_span">
								Vous devrez répondre à une <b className="orangetext">série de 10 questions</b> à choix multiples parmi
								lesquelles vous devrez choisir la ou les bonnes réponses.
							</span>

                            <span className="autoecole_container_middle_text_span">
								Vous devez atteindre la <b className="orangetext">note minimale de 7/10</b> pour obtenir votre code de la
								route, qui vous permettra de passer le <b className="orangetext">permis de conduire</b>.
							</span>

                            <span className="autoecole_container_middle_text_span">
								Attention, vous devez valider vos réponses <b className="orangetext">avant la fin du minuteur</b>, qui sera
								situé en <b className="orangetext">orange</b> sur le haut de l'écran de la tablette.
							</span>

                            <span className="autoecole_container_middle_text_span">
								En cas d'échec, vous pourrez repasser l'examen d'ici une heure.
							</span>

                            <span className="autoecole_container_middle_text_span">Bonne chance.</span>
                        </div>
                    </div>
                )}
                {status === 1 && (
                    <div className="autoecole_container_middle">
                        <img
                            className="autoecole_container_middle_picture"
                            width={919}
                            height={346}
                            src={`https://cdn.eltrane.cloud/3838384859/assets/autoecole/${data ? data[questionSelected].picture : ''}`}
                        />

                        <div className="autoecole_container_middle_question">
                            <span
                                className="autoecole_container_middle_question_text">{data ? data[questionSelected].name : ''}</span>
                            <div className="autoecole_container_middle_question_answer">
                                <div className="autoecole_container_middle_question_answer_group">
                                    {questions?.answer.map((answer, index) => {
                                        if (index % 2 === 1) {
                                            return;
                                        }

                                        return (
                                            <div
                                                key={index}
                                                className="autoecole_container_middle_question_answer_item"
                                                onClick={() => handleClick(index)}>
                                                <div className="autoecole_container_middle_question_answer_item_icon">
                                                    {answer.letter}
                                                </div>
                                                <span
                                                    className="autoecole_container_middle_question_answer_item_text">{answer.name}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="autoecole_container_middle_question_answer_group">
                                    {questions?.answer.map((answer, index) => {
                                        if (index % 2 === 0) {
                                            return;
                                        }

                                        return (
                                            <div
                                                key={index}
                                                className="autoecole_container_middle_question_answer_item"
                                                onClick={() => handleClick(index)}>
                                                <div className="autoecole_container_middle_question_answer_item_icon">
                                                    {answer.letter}
                                                </div>
                                                <span
                                                    className="autoecole_container_middle_question_answer_item_text">{answer.name}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {status === 2 && (
                    <div className="autoecole_container_middle">
                        {note >= 7 && (
                            <span className="autoecole_container_middle_title">Félicitations !</span>
                        )}
                        {note < 7 && (
							<span className="autoecole_container_middle_title">Dommage !</span>
						)}
                        <div className="autoecole_container_middle_end">
                            <span className="autoecole_container_middle_text_span">Vous avez obtenu la note de :</span>
                            <span className="autoecole_container_middle_text_span bold">
								<b className="bold orangeScore">{String(note)}</b>/{data?.length}
							</span>
                            {note >= 7 && (
                                <span className="autoecole_container_middle_text_span">
									Ce qui signifie que <b className="orangeScore">vous venez d'obtenir votre code de la route</b> !
								</span>
                            )}
                            {note < 7 && (
                                <span className="autoecole_container_middle_text_span">
									Ce qui signifie que <b className="orangeScore">vous n'avez pas obtenu votre code de la route</b> !
								</span>
                            )}
                        </div>
                    </div>
                )}
                {status === 0 && (
                    <div className="autoecole_container_bottom">
                        <button
                            onClick={() => setStatus(1)}
                            className="autoecole_container_bottom_button"
                            style={{marginRight: "20px", width: "300px"}}>
                            <img
                                className="autoecole_container_bottom_button_img"
                                src="https://cdn.eltrane.cloud/3838384859/old_a_trier/autoecole/logout.webp"></img>
                            <span
                                className="autoecole_container_bottom_button_text">Démarrer une session d'examen</span>
                        </button>
                    </div>
                )}
                {status === 1 && (
                    <div className="autoecole_container_bottom justify-content-around">
                        <div className="autoecole_container_bottom_choice">
                            {questions?.answer.map((answer: IAnswer, index: number) => {
                                return (
                                    <div
                                        key={index}
                                        className={`autoecole_container_bottom_answer ${
                                            answer.selected ? "selected" : "unselected"
                                        }`}
                                        onClick={() => handleClick(index)}>
                                        <div className="autoecole_container_bottom_answer_icon">
                                            <span className="autoecole_container_bottom_answer_icon_top">Réponse</span>
                                            <span
                                                className="autoecole_container_bottom_answer_icon_text">{answer.letter}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <button
                            onClick={() => nextQuestion()}
                            className="autoecole_container_bottom_button">
                            <img
                                className="autoecole_container_bottom_button_img"
                                src="https://cdn.eltrane.cloud/3838384859/old_a_trier/autoecole/verifier.webp"></img>
                            <span className="autoecole_container_bottom_button_text">Valider et passer à la question suivante</span>
                        </button>
                    </div>
                )}
                {status === 2 && (
                    <div className="autoecole_container_bottom">
                        <button
                            onClick={() => handleClose()}
                            className="autoecole_container_bottom_button"
                            style={{marginRight: "20px", width: "150px"}}>
                            <img
                                className="autoecole_container_bottom_button_img"
                                src="https://cdn.eltrane.cloud/3838384859/old_a_trier/autoecole/logout.webp"></img>
                            <span className="autoecole_container_bottom_button_text">Terminer</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    ) : null;
};

export default Index;
