import { S3, PutObjectCommand } from "@aws-sdk/client-s3";

export const upload = async (key: string, file: File) => {
  const s3Client = new S3({
    region: "blr1",
    endpoint: "https://blr1.digitaloceanspaces.com",
    credentials: {
      accessKeyId: import.meta.env.VITE_ACCESS_KEY_ID || "DO00JMAAK77Y3LJLFLAD",
      secretAccessKey:
        import.meta.env.VITE_SECRET_ACCESS_KEY ||
        "/VgFwR4MRkbJHQLk0ttVOD9M8G4V8JUGHqO4kuXL7do",
    },
  });
  const fileName = `AadhaarIDs/${Date.now()}_${file.name}`;
  // const fileCommand = new PutObjectCommand({
  //   Bucket: "ioh-26",
  //   Key: fileName,
  //   Body: file,
  //   ContentType: file.type,
  //   ACL: "public-read",
  // });

  // Convert File → Uint8Array
  const arrayBuffer = await file.arrayBuffer();
  const fileBytes = new Uint8Array(arrayBuffer);

  await s3Client.send(
    new PutObjectCommand({
      Bucket: "ioh-26",
      Key: fileName,
      Body: fileBytes,
      ContentType: file.type,
      ACL: "public-read", // <--- add if you want public URL
    })
  );

  console.log(key);
  //   await s3Client.send(fileCommand);
  return `https://ioh-26.blr1.digitaloceanspaces.com/${fileName}`;
};
