package com.zarco.apidraft.repository;

import com.zarco.apidraft.Model.DatosApiDraft;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

//Hereda las operaciones CRUD de la Api por medio de la clase de CrudRepository
@Repository
public interface CrudApiDraftRepository extends CrudRepository<DatosApiDraft,Long> {
}
