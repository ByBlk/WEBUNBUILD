import styles from "./manageContainer.module.scss";
import {ReactNode, useCallback, useEffect, useState} from "react";
import {getCdnUrl} from "@/utils";
import {fetchNui} from "@/hook";
import {IManagement} from "@/features/orgaManagement/orga.type.ts";

type Props = {
    permissions: IManagement[];
    type: "crew" | "company" | "faction"
};

const MANAGEMENT_RANK_LABEL = [
    '',
    'Rôles',
    'Permissions',
    'Accès',
]

const ManageContainer = ({permissions, type}: Props) => {
    const [editingId, setEditingId] = useState<number | null>(null)
    const [selectedPermissions, setSelectedPermissions] = useState<any[]>([]);
    const [selectedButtons, setSelectedButtons] = useState({
        management: 0, // Initialisé à 0 pour sélectionner le premier élément
        Permission: -1
    });
    const [currentSelectedGrade, setCurrentSelectedGrade] = useState<string | null>(null);

    // Initialisation des permissions au premier chargement
    useEffect(() => {
        if (permissions?.length > 0) {
            const firstPermission = permissions[0];
            if (firstPermission.permission) {
                setSelectedPermissions(firstPermission.permission);
                setCurrentSelectedGrade(firstPermission.fname);
            }
        }
    }, [permissions]);

    const handleSelectButton = (i: number, section: string) => {
        setSelectedButtons(prevState => ({
            ...prevState,
            [section]: i
        }));
    };

    const handleBlur = () => {
      //  fetchNui("nui:crew-management:renameroles", {id, text})
        setEditingId(null);
    };

    const handlePermissionsChange = (permissions: any[], index: number, modified?: boolean) => {
        const updatedPermissions = [...permissions];
        if (modified) {
            updatedPermissions[index].IsAcces = !updatedPermissions[index].IsAcces;
        }
        setSelectedPermissions(updatedPermissions);
    };

    const managementDOM = useCallback(() => {
        const DOM: ReactNode[] = [];
        [1, 2, 3].forEach((type) => {
            DOM.push(
                <div key={type + 'type'}>
                    <div className={styles.label} style={{marginTop: 40}}>
                        {MANAGEMENT_RANK_LABEL?.[type] ?? type}
                    </div>
                    <div className={styles.buttonList}>
                        {permissions.filter((e) => e.id === type).map((p, i) => {
                            const isSelected = selectedButtons.management === i;
                            return (
                                <div key={type + 'place' + i}>
                                    <div
                                        className={`${styles.buttonElement} ${isSelected ? styles.selected : ''}`}
                                        onClick={() => {
                                            if (editingId === null) {
                                                handlePermissionsChange(p.permission, i, false);
                                                handleSelectButton(i, 'management');
                                            }
                                            setCurrentSelectedGrade(p.fname);
                                        }}
                                    >
                                        {editingId === p.id ? (
                                            <span
                                                contentEditable
                                                suppressContentEditableWarning={true}
                                                onInput={(e) => console.log(e.currentTarget.textContent)}
                                                onBlur={() => handleBlur()}
                                                autoFocus
                                            >
                                                {p.fname} {p.lname}
                                            </span>
                                        ) : (
                                            <span>{p.fname} {p.lname}</span>
                                        )}
                                        {p.edit && (
                                            <img
                                                onClick={() => {
                                                    if (editingId !== p.id) {
                                                        setEditingId(p.id);
                                                    }
                                                }}
                                                src={getCdnUrl('assets/icons', "Edit.webp")}
                                                alt="Modifier"
                                                style={{cursor: 'pointer'}}
                                            />
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                        {/* Afficher les permissions du rôle sélectionné */}
                        {selectedPermissions
                            .filter((e) => e.id === type)
                            .map((perm, index) => {
                                const originalIndex = selectedPermissions.findIndex((p) => p === perm);
                                const checkboxId = `checkbox-${originalIndex}`;
                                return (
                                    <div key={index} className={styles.buttonElement}>
                                        <span>{perm.fname} {perm.lname}</span>
                                        <input
                                            type="checkbox"
                                            checked={perm.IsAcces}
                                            className={styles.toggle}
                                            id={checkboxId}
                                            onChange={() => handlePermissionsChange(selectedPermissions, originalIndex, true)}
                                        />
                                        <label htmlFor={checkboxId}></label>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            );
        });

        return DOM;
    }, [permissions, selectedPermissions, selectedButtons.management, editingId]);

    return (
        <div className={`${styles.subContainer} ${styles.management}`}>
            <div className={styles.title} style={{marginTop: -13, transform: 'translateX(-3px)'}}>GESTION</div>
            {managementDOM()}
            <div className={styles.submit} style={{marginTop: 42}} onClick={() => {
                fetchNui('nui:orgaManagement:UpdateRoles', {
                    type: type,
                    permissions: selectedPermissions,
                    grade: currentSelectedGrade
                });
            }}>Sauvegarder
            </div>
        </div>
    )
};

export default ManageContainer;