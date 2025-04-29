import { ref } from 'vue'
import {
  getStorage,
  ref as firebaseRef,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'

export default function useFileUpload() {
  const uploadProgress = ref(0)
  const uploadError = ref(null)
  const downloadUrl = ref('')

  const uploadFile = async (file) => {
    try {
      const storage = getStorage()
      const storageRef = firebaseRef(storage, file.name) // Or customize the path

      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          uploadProgress.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        },
        (error) => {
          uploadError.value = error
        },
        async () => {
          downloadUrl.value = await getDownloadURL(uploadTask.snapshot.ref)
        },
      )
    } catch (error) {
      uploadError.value = error
    }
  }

  return { uploadFile, uploadProgress, uploadError, downloadUrl }
}
