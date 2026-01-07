import User from "../../models/Users.js"


export async function getDoctors(req, res, next) {
    try {

        const { page = 1, limit = 8, q = '', city = '' } = req.query

        const filter = { role: 'dottore' }
        if (q && q.trim() !== '') {
            filter.$or = [
                { name: { $regex: q, $options: 'i' } },
                { surname: { $regex: q, $options: 'i' } },
                { specialization: { $regex: q, $options: 'i' } }
            ];
        }
        if (city && city.trim() !== '') {
            filter['address.city'] = { $regex: city, $options: 'i' };
        }

        const doctors = await User.find(filter)
            .skip((page - 1) * limit)
            .limit(parseInt(limit))

        const total = await User.countDocuments(filter)

        res.status(200).json({
            items: doctors,
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            hasNext: page * limit < total
        });

    } catch (err) {
        next(err)
    }
}

export async function getSpecializations(req, res, next) {
    try {
        const { specialization } = req.params
        const { page = 1, limit = 3 } = req.query

        const filter = {
            role: 'dottore'
        }

        if (specialization) {
            filter.specialization = { $regex: specialization.trim(), $options: 'i' }
        }

        const doctors = await User.find(filter)
            .skip((page - 1) * limit)
            .limit(parseInt(limit))

        const total = await User.countDocuments(filter)

        res.status(200).json({
            items: doctors,
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            hasNext: page * limit < total
        })


    } catch (err) {
        next(err)
    }
}

export async function getSingleDoctor(req, res, next) {
    try {
        const { id } = req.params
        const doctor = await User.findById(id)
        if (!doctor) {
            return res.status(404).json({ message: 'Nessun risultato trovato' })
        }

        res.status(200).json(doctor)
    } catch (err) {
        next(err)
    }
}