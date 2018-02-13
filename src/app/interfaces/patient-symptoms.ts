import {Patient} from './patient';
import {Symptom} from './symptom';
import {SignosVitales} from './signos-vitales';
import {Requireds} from './requireds';
import {QuestionsKid} from './questions-kid';
import {QuestionsMan} from './questions-man';
import {QuestionsPregnant} from './questions-pregnant';
import {QuestionsWoman} from './questions-woman';

export interface PatientSymptoms {
    basicInformation:Patient
    symptoms: Symptom[]
    signosVitales:SignosVitales
    requireds:Requireds
    observaciones:string
    triageType:number
    questions:QuestionsKid | QuestionsMan | QuestionsPregnant | QuestionsWoman
}
