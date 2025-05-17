import { Request, Response, NextFunction } from 'express';
import ReguDamkar from '../models/reguDamkar';

class ReguDamkarAuthorizer {
  private static ID_JENIS_USER_CAN_MANAGE_ID_JENIS_REGU_DAMKAR: Record<string, string[]> = {
    '3': ['2'],     // jenis_user "Pemilik Lahan" can manage jenis_regu_damkar "Pribadi"
    '4': ['1'],     // jenis_user "BPBD" can manage jenis_regu_damkar "Umum"
  };
  
  private static hasPermission(userTypeId: string, reguTypeId: string): boolean {
    const allowedTypes = this.ID_JENIS_USER_CAN_MANAGE_ID_JENIS_REGU_DAMKAR[userTypeId] || [];
    return allowedTypes.includes('*') || allowedTypes.includes(reguTypeId);
  }

  static createMiddleware(operation: string, getReguTypeId: (req: Request) => Promise<string | undefined>) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userTypeId = req.user?.id_jenis_user?.toString();
        console.log(`User: `, req.user, );
        if (!userTypeId) return res.status(403).json({ message: 'Unauthorized' });
        
        const reguTypeId = await getReguTypeId(req);
        if (!reguTypeId) return res.status(400).json({ 
          message: `Missing or invalid regu damkar type for ${operation}` 
        });
        
        if (!this.hasPermission(userTypeId, reguTypeId)) {
          return res.status(403).json({ 
            message: `You do not have permission to ${operation} this type of regu damkar` 
          });
        }
        
        next();
      } catch (error) {
        console.error(`Error in authorization:`, error);
        res.status(500).json({ message: 'Internal server error' });
      }
    };
  }

  static forCreate() {
    return this.createMiddleware('create', async (req) => req.body.id_jenis_regu_damkar?.toString());
  }
  
  static forModify(operation: 'edit' | 'delete' = 'edit') {
    return this.createMiddleware(operation, async (req) => {
      const reguDamkar = await ReguDamkar.findByPk(parseInt(req.params.id));
      return reguDamkar?.id_jenis_regu_damkar?.toString();
    });
  }
  
  static forDelete() {
    return this.forModify('delete');
  }
}

export const authorizeReguDamkarCreate = () => ReguDamkarAuthorizer.forCreate();
export const authorizeReguDamkarModify = (op: 'edit' | 'delete') => ReguDamkarAuthorizer.forModify(op);
export const authorizeReguDamkarDelete = () => ReguDamkarAuthorizer.forDelete();