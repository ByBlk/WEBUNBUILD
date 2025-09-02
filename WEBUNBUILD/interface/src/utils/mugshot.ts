export async function uploadImage(base64String: string): Promise<string | undefined> {
    const file = base64ToFile(base64String, "mugshot.png");

    const removeBgApiKey = "PuT3nLSuxPiHBrkgAmH3Cre9";
    const imgbbApiKey = "8f016ecbd1b7619724a246bf16a3cea6";

    try {
        // Supprimer l'arrière-plan
        const formDataBg = new FormData();
        formDataBg.append("image_file", file);
        formDataBg.append("size", "auto");

        const removeResponse = await fetch("https://api.remove.bg/v1.0/removebg", {
            method: "POST",
            headers: {
                "X-Api-Key": removeBgApiKey
            },
            body: formDataBg
        });

        if (!removeResponse.ok) {
            const errorText = await removeResponse.text();
            throw new Error(`Erreur remove.bg: ${removeResponse.status} - ${errorText}`);
        }

        const blob = await removeResponse.blob();

        // Convertir le blob en base64
        const base64NoBg = await blobToBase64(blob);

        // Uploader sur imgBB
        const formDataImgbb = new FormData();
        formDataImgbb.append("key", imgbbApiKey);
        formDataImgbb.append("image", base64NoBg.split(',')[1]); // imgBB n'attend que les données, sans le préfixe "data:image/png;base64,"

        const uploadResponse = await fetch("https://api.imgbb.com/1/upload", {
            method: "POST",
            body: formDataImgbb
        });

        if (!uploadResponse.ok) {
            const errorText = await uploadResponse.text();
            throw new Error(`Erreur imgBB: ${uploadResponse.status} - ${errorText}`);
        }

        const result = await uploadResponse.json();
        return result.data.url; // URL de l'image

    } catch (error) {
        console.error("Erreur lors du traitement de l'image :", error);
        return undefined;
    }
}

function base64ToFile(base64: string, filename: string): File {
    const arr = base64.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || '';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
}

function blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}
