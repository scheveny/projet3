export async function fetchProjects() {
    try {
      let response = await fetch('http://localhost:5678/api/works');
      let data = await response.json();
      dataProjects = data;
      return data;
    } catch (error) {
      console.error('Une erreur s\'est produite :', error);
      return [];
    }
  }