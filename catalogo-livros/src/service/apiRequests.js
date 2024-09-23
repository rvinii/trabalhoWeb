import { api, baseUrl } from "@/config/api";

export async function getBooks() {
    const response = await api.get('/api/livros', {params: {
        populate: "capa"
      }}).catch((error) => { return error.response })
    return response.data.data;
}

export async function getFindBook(id) {
    const response = await api.get(`/api/livros/${id}`, {params: {
        populate: "capa"
      }}).catch((error) => { return error.response });
      return response.data.data;
}

export async function buyBook(livro_id, user_id,token, payment ) {
  console.log('payment', payment);
  console.log('livro_id',livro_id);
  console.log('user_id',user_id);
  const data = {
    data: {
      type: 'cartao',
      cartaoName: payment.nome,
      cartaoNumber: payment.numeroCartao,
      cartaoValid: payment.validadeCartao,
      cartaoCvv: payment.cvvCartao,
      user_id: user_id,
      livro: livro_id,
      preco: payment.total,
    }
  }
  try {
    await api.post('/api/compras', data,{
      headers: {
          Authorization: `Bearer ${token}`
      },
    });
  }catch (error) { 
    return error.response;
  }
}

export async function update(livro, capa, token, id) {
    const body = new FormData();
    const data = {
      data: {
        genero: livro.value.genero,
        preco: livro.value.preco,
        sinopse: livro.value.sinopse,
        titulo: livro.value.titulo,
        autor: livro.value.autor,
      }
    };

    if(capa.value) {
      body.append('files.capa', capa.value)
      body.append('data', JSON.stringify(data.data))
    }
    try {
        if(capa){
          await api.put(`/api/livros/${id}`, body,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`
          }
          })
        }else{
          await api.put(`/api/livros/${id}`, data,
          {
            headers: {
              Authorization: `Bearer ${token}`
          }
          })
        }

      } catch (error) {
        error => { return error.response }
      }
  }


export function getCapaUrl(livro) {
    return `${baseUrl}${livro.capa.data.attributes.url}`;
}

export async function createBook(capa, livro, token) {
    const body = new FormData()
    body.append('files.capa', capa.value)
    body.append('data', JSON.stringify(livro.value))
    
    try {
        await api.post("/api/livros", body,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        })

      } catch (error) {
        error => { return error.response }
      }
  } 

export async function deleteBook(id, token) {
    return await api.delete(`api/livros/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).catch((error) => { return error.response });
}