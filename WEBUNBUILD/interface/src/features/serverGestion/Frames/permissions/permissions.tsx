import React, { useEffect, useState } from 'react';
import { useNuiEvent, fetchNui } from "@/hook";
import MediaCdn from '@/components/mediaCdn/mediaCdn';
import styles from './permissions.module.scss';
import ServerGestion from '../../index';

interface PermissionsProps {
    navigateTo: (component: React.ReactNode) => void;
}

const PermissionsComponent: React.FC<PermissionsProps> = ({ navigateTo }) => {
    const [selectedRole, setSelectedRole] = React.useState<string | null>(null);
    const [roles, setRoles] = React.useState<{ id: string, label: string, power: number, color: string, permissions: string[] }[]>([]);
    const [data, setData] = useState<{ [key: string]: { type: string, category: string, label: string } }>({});
    const [showInput, setShowInput] = useState(false);
    const [showDuplicateInput, setShowDuplicateInput] = useState(false);
    const [showRenameInput, setShowRenameInput] = useState(false);

    useNuiEvent('nui:server-gestion-permission:roles', (newRoles: { id: string, label: string, power: number, color: string, permissions: string[] }[]) => {
        setRoles(newRoles);
    });

    useNuiEvent('nui:server-gestion-permission:perms', (newData: { [key: string]: { type: string, category: string, label: string } }) => {
        setData(newData);
    });

    // useEscapeKey(() => {
    //     fetchNui('nui:closeServerGestion');
    // });
    useNuiEvent('nui:server-gestion-permission:askDiscordResponse', (role: { id: string, label: string, power: number, color: string, permissions: string[] }) => {
        setRoles([...roles, role]);
        setSelectedRole(role.id);
    });

    const setHighestPowerRole = () => {
        if (roles.length > 0) {
            const highestPowerRole = roles.reduce((prev, current) => (prev.power > current.power) ? prev : current);
            setSelectedRole(highestPowerRole.id);
        }
    };

    useEffect(() => {
        setHighestPowerRole();
    }, [roles.length]);

    const navigateBack = () => {
        navigateTo(<ServerGestion />);
    };

    const handleRoleClick = (roleId: string) => {
        setSelectedRole(roleId);
    };

    const handleSaveClick = (rolesToSave?: { id: string, label: string, power: number, color: string, permissions: string[] }[]) => {
        if (!rolesToSave)
            rolesToSave = [...roles];
        fetchNui('nui:server-gestion-permission:rolesave', rolesToSave)
    };

    const decimalToHex = (decimal: string) => {
        const num = parseInt(decimal, 10);
        return `#${num.toString(16).padStart(6, '0')}`;
    };

    const handleRoleAddClick = () => {
        setShowInput(true);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if (event.currentTarget.value.length > 0)
                fetchNui('nui:server-gestion-permission:askdiscord', event.currentTarget.value);
            setShowInput(false);
        }
    };

    const handleDuplicateClick = () => {
        setShowRenameInput(false);
        setShowDuplicateInput(true);
    }

    const handleKeyDownDuplicate = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if (event.currentTarget.value.length > 0)
                fetchNui('nui:server-gestion-permission:askdiscord', { discord: event.currentTarget.value, role: selectedRole });
            setShowDuplicateInput(false);
        }
    }

    const handleRenameClick = () => {
        setShowDuplicateInput(false);
        setShowRenameInput(true);
    }

    const handleKeyDownRename = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if (event.currentTarget.value.length > 0) {
                const rolesUpdate = roles.map(role => role.id === selectedRole ? { ...role, label: event.currentTarget.value } : role);
                setRoles(roles.map(role => role.id === selectedRole ? { ...role, label: event.currentTarget.value } : role));
                handleSaveClick(rolesUpdate);
            }
            setShowRenameInput(false);
        }
    }

    const handleDeleteClick = () => {
        const rolesUpdate = roles.filter(role => role.id !== selectedRole);
        setRoles(rolesUpdate);
        setSelectedRole(roles[0]?.id || null);
        handleSaveClick(rolesUpdate);
    }

    return (
        <div>
            <div className="servergestion__backicon" onClick={navigateBack}><MediaCdn path="assets/icons" name="left.svg" props={{ width: 12, height: 12 }} /></div>
            <span className="titlebox">
                <span className="title">GESTION</span>
                <br /><span className='subtitle'>PERMISSIONS</span>
            </span>

            <div className={styles.info}>
                <div><span className={styles.infotitle}>{roles.find(role => role.id === selectedRole)?.label ?? "NULL"}</span> <span className={styles.infosubtitle}>Permission</span></div>
                <div className={styles.inforole}>
                    <span className={styles.inforolelabel}>ID Discord</span>
                    <input className={styles.inforoleinput} id="discord" type="text" value={selectedRole ?? 0} style={{ width: "10vh" }} readOnly />
                    <span className={styles.inforolelabel}>Rang</span>
                    <input
                        className={styles.inforoleinput}
                        id="rang"
                        type="number"
                        value={roles.find(role => role.id === selectedRole)?.power ?? 0}
                        style={{ width: "3vh" }}
                        min={1}
                        onChange={(e) => {
                            const newPower = parseInt(e.target.value, 10);
                            if (newPower > 0) {
                                setRoles(roles.map(role => role.id === selectedRole ? { ...role, power: newPower } : role));
                            }
                        }}
                    />
                </div>
            </div>

            <div className={styles.role}>
                <div className={styles.roletitle}>Role</div>
                <div className={styles.rolecontainer}>
                    {roles.sort((a, b) => b.power - a.power).map((role) => (
                        <div
                            key={role.id}
                            id={role.id}
                            className={`${styles.rolecontaineritem} ${selectedRole === role.id ? styles.selected : ''}`}
                            onClick={() => handleRoleClick(role.id)}
                        >
                            <div
                                className={styles.rolecontaineritemcolor}
                                style={{ backgroundColor: decimalToHex(role.color) }}
                            ></div>
                            <div className={styles.rolecontaineritemlabel}>
                                {role.label}
                            </div>
                            <div className={styles.rolecontaineritempower}>
                                {role.power}
                            </div>
                        </div>
                    ))}
                </div>
                {showInput ? (
                    <input
                        className={styles.roleaddinput}
                        type="text"
                        placeholder="ID Discord"
                        onKeyDown={handleKeyDown}
                        onInput={(e) => {
                            e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
                        }}
                    />
                ) : (
                    <button className={styles.roleadd} onClick={handleRoleAddClick}>
                        <div className={styles.roleaddpower}>
                            <div className={styles.roleaddicon}>
                                <MediaCdn path="assets/icons" name="add.svg" props={{ width: 12, height: 12 }} />
                            </div>
                        </div>
                    </button>
                )}
            </div>

            <div className={styles.permissions}>
                <div className={styles.permissionstitle}>Permissions</div>
                <div className={styles.permissionssubtitle}>
                    <div className={styles.permissionssubtitlelabel}>Joueur</div>
                    <div className={styles.permissionssubtitlelabel}>Serveur</div>
                    <div className={styles.permissionssubtitlelabel}>Commandes</div>
                </div>
                <div className={styles.permissionscontainer}>
                    {(() => {
                        const categories = ["player", "server", "commands"];
                        const columns = categories.map(category =>
                            Object.keys(data).filter(key => data[key].category === category)
                        );
                        const maxRows = Math.max(...columns.map(col => col.length), 9);

                        return columns.map((keys, colIndex) => {
                            const emptySlots = maxRows - keys.length;

                            return (
                                <div key={colIndex} className={styles.permissionscontainercolumn}>
                                    {keys.map((key, index) => {
                                        const role = roles.find(role => role.id === selectedRole);
                                        const isChecked = role ? role.permissions.includes(key) : false;
                                        return (
                                            <div key={index} className={styles.permissionscontaineritem}>
                                                <div className={styles.permissionscontaineritemlabel}>
                                                    {data[key].label}
                                                </div>
                                                <label className={styles.permissionscontaineritemswitch}>
                                                    <input
                                                        className={styles.permissionscontaineritemcheckbox}
                                                        type="checkbox"
                                                        checked={isChecked}
                                                        onChange={() => {
                                                            const roleIndex = roles.findIndex(role => role.id === selectedRole);
                                                            if (roleIndex !== -1) {
                                                                const newRoles = [...roles];
                                                                if (isChecked) {
                                                                    newRoles[roleIndex].permissions = newRoles[roleIndex].permissions.filter(permission => permission !== key);
                                                                } else {
                                                                    newRoles[roleIndex].permissions.push(key);
                                                                }
                                                                setRoles(newRoles);
                                                            }
                                                        }}
                                                    />
                                                    <span className={styles.permissionscontaineritemslider}></span>
                                                </label>
                                            </div>
                                        );
                                    })}
                                    {/* Add empty slots */}
                                    {emptySlots > 0 &&
                                        Array.from({ length: emptySlots }).map((_, index) => (
                                            <div
                                                key={`empty-${colIndex}-${index}`}
                                                className={styles.permissionscontaineritem}
                                            />
                                        ))}
                                </div>
                            );
                        });
                    })()}
                </div>
                <button className={styles.savebutton} onClick={() => handleSaveClick()}>Sauvegarder les modifications</button>
            </div>

            <div className={styles.access}>
                <div className={styles.accesstitle}>Accès</div>
                <div className={styles.accesstitlesubtitle}>
                    <div className={styles.accesstitlesubtitlelabel}>Menu de Gestion</div>
                </div>
                <div className={styles.accesscontainer}>
                    {(() => {
                        const keys = Object.keys(data).filter(key => data[key].type === "access");
                        const half = Math.ceil(keys.length / 2);
                        const columns = [keys.slice(0, half), keys.slice(half)];
                        const maxRows = 9;

                        return columns.map((columnKeys, colIndex) => {
                            const emptySlots = maxRows - columnKeys.length;

                            return (
                                <div key={colIndex} className={styles.accesscontainercolumn}>
                                    {columnKeys.map((key, index) => {
                                        const role = roles.find(role => role.id === selectedRole);
                                        const isChecked = role ? role.permissions.includes(key) : false;
                                        return (
                                            <div key={index} className={styles.accesscontaineritem}>
                                                <div className={styles.accesscontaineritemlabel}>
                                                    {data[key].label}
                                                </div>
                                                <label className={styles.accesscontaineritemswitch}>
                                                    <input
                                                        className={styles.accesscontaineritemcheckbox}
                                                        type="checkbox"
                                                        checked={isChecked}
                                                        onChange={() => {
                                                            const roleIndex = roles.findIndex(role => role.id === selectedRole);
                                                            if (roleIndex !== -1) {
                                                                const newRoles = [...roles];
                                                                if (isChecked) {
                                                                    newRoles[roleIndex].permissions = newRoles[roleIndex].permissions.filter(permission => permission !== key);
                                                                } else {
                                                                    newRoles[roleIndex].permissions.push(key);
                                                                }
                                                                setRoles(newRoles);
                                                            }
                                                        }}
                                                    />
                                                    <span className={styles.accesscontaineritemslider}></span>
                                                </label>
                                            </div>
                                        );
                                    })}
                                    {/* Add empty slots */}
                                    {emptySlots > 0 &&
                                        Array.from({ length: emptySlots }).map((_, index) => (
                                            <div
                                                key={`empty-${colIndex}-${index}`}
                                                className={styles.accesscontaineritem}
                                            />
                                        ))}
                                </div>
                            );
                        });
                    })()}
                </div>
                <div className={styles.accesscontainerbutton}>
                    {showDuplicateInput ? (
                        <input
                            className={styles.accessinput}
                            type="text"
                            placeholder="ID Discord"
                            onKeyDown={handleKeyDownDuplicate}
                            onInput={(e) => {
                                e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
                            }}
                        />
                    ) : (
                        <button className={styles.accessbutton} onClick={handleDuplicateClick}>
                            Dupliquer
                        </button>
                    )}
                    {showRenameInput ? (
                        <input
                            className={styles.accessinput}
                            type="text"
                            placeholder="Nom du rôle"
                            onKeyDown={handleKeyDownRename}
                        />
                    ) : (
                        <button className={styles.accessbutton} onClick={handleRenameClick}>
                            Renommer
                        </button>
                    )}
                    <button className={styles.accessbutton} onClick={handleDeleteClick}>Supprimer</button>
                </div>
            </div>
        </div>
    );
};

export default PermissionsComponent;
