export async function signInWithGoogle() {
  return new Promise((resolve) => setTimeout(resolve, 1000));
}

export async function signInWithGitHub() {
  return new Promise((resolve) => setTimeout(resolve, 1000));
}

export async function signInGuest() {
  return new Promise((resolve) => setTimeout(resolve, 500));
}

export async function signInWithEmail(email: string, password: string) {
  return new Promise((resolve) => setTimeout(resolve, 1000));
}