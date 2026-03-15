const config = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PRJECT_ID),
  appwriteDataBaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteTableId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appwriteBacketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};

export default config;
