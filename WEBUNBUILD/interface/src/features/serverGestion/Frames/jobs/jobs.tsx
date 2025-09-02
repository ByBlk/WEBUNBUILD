import React from 'react';
import styles from "./jobs.module.scss";
import { TJob } from './types';
import MediaCdn from "@/components/mediaCdn/mediaCdn";
import { fetchNui } from "@/hook";
import { getCdnUrl } from "@/utils";
import ServerGestion from '../../index';

interface Props {
	navigateTo: (component: React.ReactNode) => void;
}

const Jobs: React.FC<Props> = ({navigateTo}) => {
	const [localJobs, setLocalJobs] = React.useState<TJob[]>([]);
	const [job, setJob] = React.useState<TJob | undefined>(undefined);
	const [newJob, setNewJob] = React.useState<TJob | undefined>(undefined);
	const [jobKey, setJobKey] = React.useState<string | undefined>(undefined);
	const nameRef = React.useRef<HTMLInputElement>(null);

	const navigateBack = () => {
        navigateTo(<ServerGestion />);
    };

	const send = () => {
		fetchNui("nui:server-gestion-jobs:sendJobs", localJobs);
	}

	const save = () => {
		if (!newJob) return;

		setJob(newJob);

		setLocalJobs(prevJobs => {
			const index = prevJobs.findIndex(i => i.name === jobKey);
			if (index === -1) return prevJobs;

			prevJobs[index] = newJob;

			send();

			return prevJobs;
		});
	}


	const add = () => {
		const i: TJob = {
			name: "newjob_" + Math.random().toString(30).substr(2, 9).replace(/[^a-z]/g, ''),
			imgJob: getCdnUrl("assets/gestion-serveur", "question.svg"),
			imgJobcenter: getCdnUrl("assets/gestion-serveur", "question.svg"),
			salary: 0,
			timer: 0,
			premium: false,
			premiumMultiplier: 0,
			premiumPlusMultiplier: 0,
			location: { x: 0, y: 0 },
			indicator1: "",
			indicator2: "",
			indicator3: "",
			status: "active",
		};

		setJob(i);
		setNewJob(i);

		setLocalJobs(prevJobs => [...prevJobs, i]);
		send();
	}

	const duplicate = () => {
		if (!job) return;

		const i: TJob = {
			name: "newjob_" + Math.random().toString(30).substr(2, 9).replace(/[^a-z]/g, ''),
			imgJob: job.imgJob,
			imgJobcenter: job.imgJobcenter,
			salary: job.salary,
			timer: job.timer,
			premium: job.premium,
			premiumMultiplier: job.premiumMultiplier,
			premiumPlusMultiplier: job.premiumPlusMultiplier,
			location: job.location,
			indicator1: job.indicator1,
			indicator2: job.indicator2,
			indicator3: job.indicator3,
			status: job.status,
		};

		setJob(i);
		setNewJob(i);

		setLocalJobs(prevJobs => [...prevJobs, i]);
		send();
	}

	const remove = () => {
		if (!job) return;

		setLocalJobs(prevJobs => {
			const index = prevJobs.findIndex(i => i.name === job.name);
			if (index === -1) return prevJobs;

			const updatedItems = [...prevJobs];
			updatedItems.splice(index, 1);
			return updatedItems;
		});
		setJob(undefined);
		setNewJob(undefined);
		send();
	}

	const updateItem = (key: string, value: any) => {
		setNewJob(prevJobs => {
			if (!prevJobs) return;

			// Check for duplicate keys
			if (key === "name") {
				const exists = localJobs.find(i => i.name === value);

				if (exists) {
					nameRef.current?.setCustomValidity("Ce nom est déjà utilisé");
				} else {
					nameRef.current?.setCustomValidity("");
				}

				nameRef.current?.reportValidity();

				if (exists) return prevJobs;
			}

			const updatedItem = { ...prevJobs, [key]: value };
			return updatedItem;
		});
	}

	return (
		<div className={styles.Jobs}>
			<div className={styles.topbuttons}>
				<div className={styles.window} onClick={() => console.log("Je sais pas ce que ca fait ce truc")}>
					<MediaCdn path="assets/gestion-serveur" name="window.svg" />
				</div>
				<div className={styles.close} onClick={() => console.log("Fermer")}>
					<MediaCdn path="assets/gestion-serveur" name="close.svg" />
				</div>
			</div>
			<div className={styles.header}>
				<div className={styles.goBack} onClick={navigateBack}><MediaCdn path="assets/icons" name="left.svg" props={{ width: 12, height: 12 }} /></div>
				<div className={styles.titles}>
					<h1 className={styles.titleGestion}>Gestion</h1>
					<h2 className={styles.subtitleGestion}>Jobs de farm</h2>
				</div>
			</div>
			<div className={styles.body}>
				<div className={`${styles.column}`}>
					<div className={styles.main}>
						<div className={styles.title}>Liste des jobs de farm</div>
						<div className={`${styles.content} ${styles.scrollbar}`}>
							{localJobs.sort((a, b) => a.name.localeCompare(b.name))
								.map((recipe, i) => (
									<div key={i} className={styles.item} onClick={() => { setJob(recipe); setNewJob(recipe); setJobKey(recipe.name); }}>
										<img src={recipe.imgJob} alt={recipe.name} />
										<div className={styles.label}>{recipe.name}</div>
									</div>
								))}
							<div className={`${styles.item} ${styles.add}`} onClick={() => add()}>
								+
							</div>
						</div>
					</div>
				</div>
				{job && (
					<div className={`${styles.column}`}>
						<div className={styles.actions}>
							<div className={styles.title}>
								Sélection
							</div>
							<div className={styles.subtitle}>
								Preview
							</div>

							<div className={styles.preview}>
								<img src={newJob?.imgJob} alt={newJob?.name} />
								<div className={styles.infos}>
									<div className={styles.itemname}>{job.name}</div>
								</div>
							</div>

							<div className={styles.subtitle}>
								Informations
							</div>

							<div className={`${styles.metadata} ${styles.scrollbar}`}>
								<div className={styles.info}>
									<div className={styles.icon}>
										<MediaCdn path="assets/gestion-serveur/crew" name="name.svg" />
									</div>
									<div className={styles.label}>
										Nom du job
										{job.name !== newJob?.name && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={styles.value}>
										<input
											type="text"
											value={newJob?.name || ''}
											pattern='[a-z_]*'
											onChange={(e) => {
												const value = e.currentTarget.value;
												if (/^[a-z_]*$/.test(value)) {
													updateItem("name", value);
												}
											}}
										/>
									</div>
								</div>

								<div className={styles.info}>
									<div className={styles.icon}>
										<MediaCdn path="assets/gestion-serveur/crew" name="name.svg" />
									</div>
									<div className={styles.label}>
										Salaire
										{job.salary !== newJob?.salary && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={styles.value}>
										<input
											type="number"
											value={newJob?.salary || ''}
											onChange={(e) => {
												const value = e.currentTarget.value;
												updateItem("salary", value);
											}}
										/>
									</div>
								</div>

								<div className={styles.info}>
									<div className={styles.icon}>
										<MediaCdn path="assets/gestion-serveur/crew" name="name.svg" />
									</div>
									<div className={styles.label}>
										Timer
										{job.timer !== newJob?.timer && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={styles.value}>
										<input
											type="number"
											value={newJob?.timer || ''}
											onChange={(e) => {
												const value = e.currentTarget.value;
												updateItem("timer", value);
											}}
										/>
									</div>
								</div>

								<div className={styles.info}>
									<div className={styles.icon}>
										<MediaCdn path="assets/gestion-serveur/crew" name="name.svg" />
									</div>
									<div className={styles.label}>
										Timer
										{job.timer !== newJob?.timer && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={styles.value}>
										<input
											type="number"
											value={newJob?.timer || ''}
											onChange={(e) => {
												const value = e.currentTarget.value;
												updateItem("timer", value);
											}}
										/>
									</div>
								</div>

								<div className={styles.info}>
									<div className={styles.icon}>
										<MediaCdn path="assets/gestion-serveur/crew" name="name.svg" />
									</div>
									<div className={styles.label}>
										Job premium
										{job.premium !== newJob?.premium && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={styles.value}>
										<input type="checkbox" checked={newJob?.premium || false} onChange={(e) => updateItem("premium", e.currentTarget.checked)} />
									</div>
								</div>

								<div className={styles.info}>
									<div className={styles.icon}>
										<MediaCdn path="assets/gestion-serveur/crew" name="name.svg" />
									</div>
									<div className={styles.label}>
										Multiplicateur premium (Argent)
										{job.premiumMultiplier !== newJob?.premiumMultiplier && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={styles.value}>
										<input
											type="number"
											value={newJob?.premiumMultiplier || ''}
											onChange={(e) => {
												const value = e.currentTarget.value;
												updateItem("premiumMultiplier", value);
											}}
										/>
									</div>
								</div>

								<div className={styles.info}>
									<div className={styles.icon}>
										<MediaCdn path="assets/gestion-serveur/crew" name="name.svg" />
									</div>
									<div className={styles.label}>
										Multiplicateur premium + (Argent)
										{job.premiumPlusMultiplier !== newJob?.premiumPlusMultiplier && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={styles.value}>
										<input
											type="number"
											value={newJob?.premiumPlusMultiplier || ''}
											onChange={(e) => {
												const value = e.currentTarget.value;
												updateItem("premiumPlusMultiplier", value);
											}}
										/>
									</div>
								</div>

								<div className={styles.info}>
									<div className={styles.icon}></div>
									<div className={styles.label}>
										Localisation
										{(job.location.x !== newJob?.location.x || job.location.y !== newJob?.location.y) && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={`${styles.value} ${styles.location}`}>
										<input
											type="text"
											value={newJob?.location.x || ''}
											placeholder="X"
											onChange={(e) => {
												const value = e.currentTarget.value;
												updateItem("location", { x: value, y: newJob?.location.y });
											}}
										/>
										<input
											type="number"
											value={newJob?.location.y || ''}
											placeholder="Y"
											onChange={(e) => {
												const value = e.currentTarget.value;
												updateItem("location", { x: newJob?.location.x, y: value });
											}}
										/>
									</div>
								</div>

								<div className={styles.info}>
									<div className={styles.icon}></div>
									<div className={styles.label}>
										Indicateur 1
										{job.indicator1 !== newJob?.indicator1 && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={styles.value}>
										<input
											type="text"
											value={newJob?.indicator1 || ''}
											onChange={(e) => {
												const value = e.currentTarget.value;
												updateItem("indicator1", value);
											}}
										/>
									</div>
								</div>

								<div className={styles.info}>
									<div className={styles.icon}></div>
									<div className={styles.label}>
										Indicateur 2
										{job.indicator2 !== newJob?.indicator2 && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={styles.value}>
										<input
											type="text"
											value={newJob?.indicator2 || ''}
											onChange={(e) => {
												const value = e.currentTarget.value;
												updateItem("indicator2", value);
											}}
										/>
									</div>
								</div>

								<div className={styles.info}>
									<div className={styles.icon}></div>
									<div className={styles.label}>
										Indicateur 3
										{job.indicator3 !== newJob?.indicator3 && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={styles.value}>
										<input
											type="text"
											value={newJob?.indicator3 || ''}
											onChange={(e) => {
												const value = e.currentTarget.value;
												updateItem("indicator3", value);
											}}
										/>
									</div>
								</div>

								<div className={styles.info}>
									<div className={styles.icon}></div>
									<div className={styles.label}>
										Statut du job
										{job.status !== newJob?.status && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={styles.value}>
										<select value={newJob?.status || ''} onChange={(e) => updateItem("status", e.currentTarget.value)}>
											<option value="active">Actif</option>
											<option value="inactive">Inactif</option>
										</select>
									</div>
								</div>

								<div className={styles.subtitle}>
									Image Jobcenter
								</div>

								<div className={styles.info} style={{ backgroundColor: "rgba(170, 170, 170, 0.10)" }}>
									<div className={styles.icon}></div>
									<div className={styles.label}>
										Image CDN
										{job.imgJobcenter !== newJob?.imgJobcenter && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={styles.value}>
										<input type="text" value={newJob?.imgJobcenter || ''} onChange={(e) => updateItem("imgJobcenter", e.currentTarget.value)} />
									</div>
								</div>

								<div className={styles.subtitle}>
									Image job
								</div>

								<div className={styles.info} style={{ backgroundColor: "rgba(170, 170, 170, 0.10)" }}>
									<div className={styles.icon}></div>
									<div className={styles.label}>
										Image CDN
										{job.imgJob !== newJob?.imgJob && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={styles.value}>
										<input type="text" value={newJob?.imgJob || ''} onChange={(e) => updateItem("imgJob", e.currentTarget.value)} />
									</div>
								</div>
							</div>

							<div className={styles.footer}>
								<button className={styles.button} onClick={() => remove()}>Supprimer</button>
								<button className={styles.button} onClick={() => duplicate()}>Dupliquer</button>
								<button className={styles.button} onClick={() => save()}>Sauvegarder</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Jobs;
